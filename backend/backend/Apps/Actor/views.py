from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import Actor, ActorImage
from .serializer import ( 
    ActorSerializer,
    ActorImageSerializer,
)
from ..Movie.models import Movie_Actor
from ..Movie.serializer import MovieSliceSerializer
# Create your views here.

class ActorDetailView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        actor = Actor.objects.get(pk=pk)
        serializer = ActorSerializer(actor)
        return Response(serializer.data)
    

class ActorMovieView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        movie_list = Movie_Actor.objects.filter(actor=pk)
        movies = [movie.movie for movie in movie_list]
        serializer = MovieSliceSerializer(movies, many=True)
        return Response(serializer.data)


class ActorImageView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        actor = Actor.objects.get(pk=pk)
        images = ActorImage.objects.filter(actor=actor)
        serializer = ActorImageSerializer(images, many=True)
        return Response(serializer.data)


from elasticsearch_dsl import Q
from .documents import ActorDocument


class SearchActorView(APIView):
    permission_classes = [AllowAny]
    document_class = ActorDocument

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
