from rest_framework import serializers
from .models import Review
from ..Rate.models import Rate
from ..Profile.serializer import ProfileSerializer
from ..Movie.serializer import MovieBannerSerializer

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    rate = serializers.SerializerMethodField()

    def get_user(self, obj):
        account = obj.account
        return ProfileSerializer(account.profile).data

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
        return MovieBannerSerializer(obj.movie).data

    class Meta:
        model = Review
        fields = '__all__'
