from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializer import (
    ReviewSerializer,
    ReviewUpdateSerializer,
    ReviewPersonalViewSerializer,
    VoteReviewSerializer
)
from .models import Review, Vote
from ..Rate.models import Rate
from ..Movie.models import Movie
from ..Movie.serializer import MovieSliceSerializer

# Create your views here.
class ReviewListView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthentication]

    def get(self, request, pk):
        reviews = Review.objects.filter(movie=pk)
        movie = Movie.objects.get(pk=pk)
        movie_serializer = MovieSliceSerializer(movie).data
        try:
            own = reviews.get(account=request.user.id)
            user_review = ReviewSerializer(own, context={'request': request}).data
        except:
            user_review = None
        serializer = ReviewSerializer(reviews, many=True, context={'request': request})
        all_rate = Rate.objects.filter(movie=pk)
        rate_count = all_rate.count()
        rate_1 = all_rate.filter(rate=1).count()
        rate_2 = all_rate.filter(rate=2).count()
        rate_3 = all_rate.filter(rate=3).count()
        rate_4 = all_rate.filter(rate=4).count()
        rate_5 = all_rate.filter(rate=5).count()

        return Response({
            'movie': movie_serializer,
            'reviews': serializer.data,
            'own': user_review,
            'chart': {
                'all': rate_count,
                'rate_num': {
                    'rate_1': rate_1,
                    'rate_2': rate_2,
                    'rate_3': rate_3,
                    'rate_4': rate_4,
                    'rate_5': rate_5
                }
            }
        })


class ReviewPersonalView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        reviews = Review.objects.filter(account=request.user)
        serializer = ReviewPersonalViewSerializer(reviews, many=True)
        return Response(serializer.data)

    def put(self, request):
        request.data['account'] = request.user.id
        user_review = Review.objects.get(account=request.user, movie=request.data['movie'])
        serializer = ReviewUpdateSerializer(user_review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        user_review = Review.objects.get(account=request.user, movie=request.data['movie'])
        user_review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReviewCreateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        request.data['movie'] = pk
        request.data['account'] = request.user.id
        serializer = ReviewUpdateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewVoteView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        request.data['account'] = request.user.id
        request.data['review'] = pk
        serializer = VoteReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        request.data['account'] = request.user.id
        request.data['review'] = pk
        vote = Vote.objects.get(review=pk, account=request.user)
        serializer = VoteReviewSerializer(vote, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        vote = Vote.objects.get(review=pk, account=request.user)
        vote.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
