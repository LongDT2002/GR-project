from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from ..Movie.models import Movie
from .models import Rate
from .serializer import RateSerializer


# Create your views here.
class RatePersonal(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, pk):
        movie = Movie.objects.get(pk=pk)
        try:
            rate = Rate.objects.get(movie=movie, account=request.user)
            serializer = RateSerializer(rate)
            return Response(serializer.data, status=200)
        except Rate.DoesNotExist:
            return Response({'message': 'Rate not found'})

    def post(self, request, pk):
        movie = Movie.objects.get(pk=pk)
        request.data["account"] = request.user.id
        serializer = RateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                movie.ave_rate = movie.average_rating()
                movie.save()
                return Response({'message': 'Rate created'}, status=201)
            except :
                return Response(serializer.errors, status=400)
            
    def put(self, request, pk):
        movie = Movie.objects.get(pk=pk)
        rate = Rate.objects.get(movie=movie, account=request.user)
        request.data["account"] = request.user.id
        serializer = RateSerializer(rate, data=request.data)
        if serializer.is_valid():
            serializer.save()
            movie.ave_rate = movie.average_rating()
            movie.save()
            return Response({'message': 'Rate updated'}, status=200)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        movie = Movie.objects.get(pk=pk)
        rate = Rate.objects.get(movie=movie, account=request.user)
        rate.delete()
        movie.ave_rate = movie.average_rating()
        movie.save()
        return Response({'message': 'Rate deleted'}, status=204)
