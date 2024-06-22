from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
# Create your views here.

from .models import Director, DirectorImage
from .serializer import ( 
    DirectorSerializer,
    DirectorImageSerializer,
)

from ..Movie.models import Movie
from ..Movie.serializer import MovieSliceSerializer


class DirectorDetailView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        director = Director.objects.get(pk=pk)
        serializer = DirectorSerializer(director)
        return Response(serializer.data)


class DirectorMovieView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        movies = Movie.objects.filter(director=pk)
        serializer = MovieSliceSerializer(movies, many=True)
        return Response(serializer.data)


class DirectorImageView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        director = Director.objects.get(pk=pk)
        images = DirectorImage.objects.filter(director=director)
        serializer = DirectorImageSerializer(images, many=True)
        return Response(serializer.data)


from elasticsearch_dsl import Q
from .documents import DirectorDocument


class SearchDirectorView(APIView):
    permission_classes = [AllowAny]
    document_class = DirectorDocument

    def generate_q_expression(self, query):
        return Q("multi_match", query=query, fields=["name"], fuzziness="AUTO")
    
    def get(self, request, query):
        q = self.generate_q_expression(query)
        if not q:
            return Response({"error": "query is required"}, status=400)
        search = self.document_class.search().query(q)
        response = search.execute()
        hits = response.hits.hits
        result = [hit.to_dict().get('_source') for hit in hits]
        return Response(result)
