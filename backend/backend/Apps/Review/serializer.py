from rest_framework import serializers
from .models import Review, Vote
from ..Rate.models import Rate
from ..Profile.serializer import ProfileSerializer
from ..Movie.serializer import MovieSliceSerializer

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    rate = serializers.SerializerMethodField()
    vote = serializers.SerializerMethodField()
    own_vote = serializers.SerializerMethodField()

    def get_user(self, obj):
        return ProfileSerializer(obj.account.profile).data

    def get_vote(self, obj):
        all_vote = obj.vote_review.all()
        up = all_vote.filter(vote=True).count()
        down = all_vote.filter(vote=False).count()
        return {
            'up': up,
            'down': down
        }

    def get_own_vote(self, obj):
        user = self.context['request'].user
        try:
            return Vote.objects.get(review=obj.id, account=user.id).vote
        except Vote.DoesNotExist:
            return None

    def get_rate(self, obj):
        try:
            return Rate.objects.get(movie=obj.movie, account=obj.account).rate
        except Rate.DoesNotExist:
            return 0

    class Meta:
        model = Review
        fields = '__all__'


class ReviewUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class ReviewPersonalViewSerializer(serializers.ModelSerializer):
    movie = serializers.SerializerMethodField()

    def get_movie(self, obj):
        return MovieSliceSerializer(obj.movie).data

    class Meta:
        model = Review
        fields = '__all__'


class VoteReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'
