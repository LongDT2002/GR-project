from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from .models import Movie

@registry.register_document
class MovieDocument(Document):
    poster = fields.TextField()
    actors = fields.NestedField(properties={
        'id': fields.IntegerField(),
        'name': fields.TextField(),
        'image': fields.TextField()
    })

    class Index:
        name = "movies"
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0
        }

    class Django:
        model = Movie
        fields = [
            'id',
            'title', 
            'release_date', 
            'summary',
            'ave_rate',
        ]

    def prepare_poster(self, instance):
        poster = instance.movieimage_set.filter(type="poster").first()
        if poster and poster.image:
            return poster.image.url
        return None

    def prepare_actors(self, instance):
        return [
            {
                'id': actor.actor.id,
                'name': actor.actor.name,
                'image': actor.actor.actor_images.first().image.url if actor.actor.actor_images.first() and actor.actor.actor_images.first().image else None
            } for actor in instance.movie_actor.all()[:10]
        ]
