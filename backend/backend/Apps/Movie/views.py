from rest_framework import pagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models import Prefetch

from ..Rate.cache import recommendations
from .models import Movie, Genre, Movie_Genre, MovieImage
from .serializer import (
    GenreSerializer,
    MovieSerializer,
    MovieBannerSerializer,
    MovieImageSerializer,
    MovieVideoSerializer,
    MovieCastSerializer,
    MovieSliceSerializer
)


class MovieDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        movie = Movie.objects.select_related('director').prefetch_related(
            Prefetch('movie_genre', queryset=Movie_Genre.objects.select_related('genre')),
            Prefetch('movieimage_set', queryset=MovieImage.objects.filter(type__in=['poster', 'backdrop', 'logo']))
        ).get(pk=pk)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)


class MovieImageView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        movie = Movie.objects.get(pk=pk)
        serializer = MovieImageSerializer(movie)
        return Response(serializer.data)


class MovieVideoView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        movie = Movie.objects.get(pk=pk)
        serializer = MovieVideoSerializer(movie)
        return Response(serializer.data)
    

class MovieActorView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        movie = Movie.objects.get(pk=pk)
        serializer = MovieCastSerializer(movie)
        return Response(serializer.data)


class GenreListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)


class MyPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            'links': {
               'next': self.get_next_link(),
               'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })


class MovieByGenreView(APIView, MyPagination):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        data = Movie_Genre.objects.filter(genre=pk)
        res = [MovieSliceSerializer(movie.movie).data for movie in data]
        serializer = self.paginate_queryset(res, request)
        return self.get_paginated_response(serializer)


class TrendingMoviesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        movie = Movie.objects.select_related('director').prefetch_related(
            Prefetch('movieimage_set', queryset=MovieImage.objects.filter(type__in=['poster', 'backdrop', 'logo']))
        ).all().order_by('-ave_rate')[:15]
        serializer = MovieBannerSerializer(movie, many=True)
        return Response(serializer.data)


class LatestMoviesView(APIView, MyPagination):
    permission_classes = [AllowAny]

    def get(self, request):
        movie = Movie.objects.prefetch_related(
            Prefetch('movieimage_set', queryset=MovieImage.objects.filter(type__in=['poster']))
        ).all().order_by('-release_date')
        res = self.paginate_queryset(movie, request)
        serializer = MovieSliceSerializer(res, many=True)
        return self.get_paginated_response(serializer.data)


from datetime import datetime

class UpcomingMoviesView(APIView, MyPagination):
    permission_classes = [AllowAny]

    def get(self, request):
        current_year = datetime.now().year
        movie = Movie.objects.prefetch_related(
            Prefetch('movieimage_set', queryset=MovieImage.objects.filter(type__in=['poster']))
        ).filter(release_date__year=current_year).order_by('release_date')
        serializer = MovieSliceSerializer(movie, many=True)
        return Response(serializer.data)



class TopRatedMoviesView(APIView, MyPagination):
    permission_classes = [AllowAny]

    def get(self, request):
        movie = Movie.objects.prefetch_related(
            Prefetch('movieimage_set', queryset=MovieImage.objects.filter(type__in=['poster']))
        ).all().order_by('-ave_rate')
        serializer = MovieSliceSerializer(movie, many=True)
        return Response(serializer.data)


class RecommendMoviesView(APIView, MyPagination):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        rcm = recommendations.recommend(request.user.id)
        try:
            result = []
            for rec in rcm:
                try:
                    movie = Movie.objects.prefetch_related(
                        Prefetch('movieimage_set', queryset=MovieImage.objects.filter(type__in=['poster']))
                    ).get(pk=rec)
                    result.append(MovieSliceSerializer(movie).data)
                except:
                    pass
            serializer = self.paginate_queryset(result, request)
            return self.get_paginated_response(serializer)
        except:
            return Response(None)


from .utils import recommend

class RelatedMoviesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        movie_id = Movie.objects.get(pk=pk).id
        related = recommend(movie_id)
        result = []
        for idx in related:
            try:
                movie = Movie.objects.prefetch_related(
                    Prefetch('movieimage_set', queryset=MovieImage.objects.filter(type__in=['poster']))
                ).get(pk=idx+1)
                result.append(MovieSliceSerializer(movie).data)
            except:
                pass
        return Response(result)


from elasticsearch_dsl import Q
from .documents import MovieDocument

class SearchMovieView(APIView):
    permission_classes = [AllowAny]
    document_class = MovieDocument
    
    def generate_q_expression(self, query, release_date=None):
        must_conditions = []

        if query:
            must_conditions.append(Q("multi_match", query=query, fields=["title"], fuzziness="AUTO"))

        if release_date:
            release_date = release_date.split(",")
            if len(release_date) == 1:
                must_conditions.append(Q("range", release_date={"gte": release_date[0]}))
            else:
                release_date_range = {}
                release_date_range["gte"] = release_date[0]
                release_date_range["lte"] = release_date[1]
                must_conditions.append(Q("range", release_date=release_date_range))

        if not must_conditions:
            return None

        return Q("bool", must=must_conditions)
    
    def get(self, request):
        query = request.query_params.get("query")
        release_date = request.query_params.get("release_date")
        q = self.generate_q_expression(query, release_date)
        if not q:
            return Response({"error": "query is required"}, status=400)
        search = self.document_class.search().query(q)
        response = search.execute()
        hits = response.hits.hits
        result = [hit.to_dict().get('_source') for hit in hits]
        return Response(result)
