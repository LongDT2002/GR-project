from rest_framework import serializers

from .models import Rate
from ..Movie.models import Movie
from ..Movie.serializer import MovieSliceSerializer

class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        fields = '__all__'


class AllPersonalRateSerializer(serializers.ModelSerializer):
    movie = serializers.SerializerMethodField()

    def get_movie(self, obj):
        return MovieSliceSerializer(obj.movie).data

    class Meta:
        model = Rate
        fields = '__all__'


class MovieWithRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['ave_rate']
