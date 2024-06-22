from rest_framework import serializers
from .models import Director, DirectorImage


class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'


class DirectorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DirectorImage
        fields = ['id', 'image']
