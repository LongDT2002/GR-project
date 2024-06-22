from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from .models import Movie

@registry.register_document
class MovieDocument(Document):
    poster = fields.TextField()
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
        if poster:
            return poster.image.url
        return None
