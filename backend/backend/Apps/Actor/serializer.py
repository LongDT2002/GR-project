from rest_framework import serializers
from .models import Actor, ActorImage

from ..Movie.models import Movie, MovieImage, Movie_Actor


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = '__all__'


class ActorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActorImage
        fields = ['id', 'image']


class ActorSliceSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    def get_images(self, obj):
        try:
            images = obj.actor_images.all()[0]
            serializer = ActorImageSerializer(images)
            return serializer.data
        except:
            return None
    
    class Meta:
        model = Actor
        fields = ('id', 'name', 'images')



