from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from .models import Director

@registry.register_document
class DirectorDocument(Document):
    image = fields.TextField()
    class Index:
        name = "directors"
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0
        }

    class Django:
        model = Director
        fields = [
            'id',
            'name',
        ]

    def prepare_image(self, instance):
        image = instance.director_images.all().first()
        if image:
            return image.image.url
        return None
