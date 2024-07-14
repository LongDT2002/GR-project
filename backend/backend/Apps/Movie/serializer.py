from rest_framework import serializers
from django.db.models import Prefetch

from .models import Movie, Genre, MovieImage, MovieVideo, Movie_Actor, Movie_Genre
from ..Actor.models import ActorImage
from ..Actor.serializer import ActorSliceSerializer


class MovieDataForContentBased(serializers.ModelSerializer):
    genres = serializers.SerializerMethodField()
    actors = serializers.SerializerMethodField()
    director = serializers.SerializerMethodField()

    def get_director(self, obj):
        try:
            return obj.director.name
        except:
            return None

    def get_actors(self, obj):
        actors = Movie_Actor.objects.filter(movie=obj)
        actor_list = [actor.actor.name for actor in actors]
        return actor_list

    def get_genres(self, obj):
        genres = Movie_Genre.objects.filter(movie=obj)
        genre_list = [genre.genre.name for genre in genres]
        return genre_list

    class Meta:
        model = Movie
        fields = ['id', 'title', 'summary', 'genres', 'actors', 'director']


class MovieSerializer(serializers.ModelSerializer):
    genres = serializers.SerializerMethodField()
    director = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    trailer = serializers.SerializerMethodField()
    
    def get_genres(self, obj):
        genres = Movie_Genre.objects.filter(movie=obj)
        genre_list = [GenreSerializer(genre.genre).data for genre in genres]
        return genre_list
    
    def get_director(self, obj):
        try:
            return {"id": obj.director.id, "name": obj.director.name}
        except:
            return None

    def get_images(self, obj):
        images = {
            "logo": None,
            "poster": None,
            "backdrop": None
        }
        for image in obj.movieimage_set.all():
            if image.type in images:
                images[image.type] = image.image.url
            if all(images.values()):
                break
        return images

    def get_trailer(self, obj):
        for video in obj.movievideo_set.all():
            if video.type == "Trailer":
                return video.link.url
        return None
        
    class Meta:
        model = Movie
        fields = '__all__'


class MovieActorDetailSerializer(serializers.ModelSerializer):
    actor = serializers.SerializerMethodField()
    
    def get_actor(self, obj):
        actor = obj.actor
        serializer = ActorSliceSerializer(actor)
        return serializer.data
    
    class Meta:
        model = Movie_Actor
        fields = ['actor', 'character_name']


class MovieCastSerializer(serializers.ModelSerializer):
    actors = serializers.SerializerMethodField()

    def get_actors(self, obj):
        movie_actors = Movie_Actor.objects.filter(movie=obj).select_related('actor').prefetch_related(
            Prefetch('actor__actor_images', queryset=ActorImage.objects.all())
        )
        serializer = MovieActorDetailSerializer(movie_actors, many=True)
        return serializer.data

    class Meta:
        model = Movie
        fields = ['actors']


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieImage
        fields = '__all__'


class MovieImageSerializer(serializers.Serializer):
    backdrops = serializers.ListField(child=ImageSerializer())
    posters = serializers.ListField(child=ImageSerializer())
    logos = serializers.ListField(child=ImageSerializer())

    def to_representation(self, obj):
        images = MovieImage.objects.filter(movie=obj)
        backdrops = images.filter(type='backdrop')
        posters = images.filter(type='poster')
        logos = images.filter(type='logo')

        return {
            'backdrops': ImageSerializer(backdrops, many=True).data,
            'posters': ImageSerializer(posters, many=True).data,
            'logos': ImageSerializer(logos, many=True).data
        }


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieVideo
        fields = '__all__'


class MovieVideoSerializer(serializers.Serializer):
    def to_representation(self, obj):
        videos = MovieVideo.objects.filter(movie=obj)
        trailer = videos.filter(type='Trailer')
        teaser = videos.filter(type='Teaser')
        clips = videos.filter(type='Clip')
        behind_the_scene = videos.filter(type='Behind the Scenes')
        bloopers = videos.filter(type='Blooper')
        featurettes = videos.filter(type='Featurette')
        opening_credits = videos.filter(type='Opening Credits')

        return {
            'trailers': VideoSerializer(trailer, many=True).data,
            'teasers': VideoSerializer(teaser, many=True).data,
            'clips': VideoSerializer(clips, many=True).data,
            'behind_the_scenes': VideoSerializer(behind_the_scene, many=True).data,
            'bloopers': VideoSerializer(bloopers, many=True).data,
            'featurettes': VideoSerializer(featurettes, many=True).data,
            'opening credits': VideoSerializer(opening_credits, many=True).data
        }


class MovieBannerSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    def get_images(self, obj):
        images = {
            "logo": None,
            "poster": None,
            "backdrop": None
        }
        for image in obj.movieimage_set.all():
            if image.type in images:
                images[image.type] = image.image.url
            if all(images.values()):
                break
        return images

    class Meta:
        model = Movie
        fields = ['id', 'title', 'release_date', 'original_country', 'ave_rate', 'summary', 'images']


class MovieSliceSerializer(serializers.ModelSerializer):
    poster = serializers.SerializerMethodField()

    def get_poster(self, obj):
        for image in obj.movieimage_set.all():
            if image.type == 'poster':
                return image.image.url
        return None

    class Meta:
        model = Movie
        fields = ['id', 'title', 'release_date', 'ave_rate', 'poster']
