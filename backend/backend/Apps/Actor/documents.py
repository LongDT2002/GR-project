from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from .models import Actor

@registry.register_document
class ActorDocument(Document):
    image = fields.TextField()
    class Index:
        name = "actors"
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0
        }

    class Django:
        model = Actor
        fields = [
            'id',
            'name',
        ]

    def prepare_image(self, instance):
        image = instance.actor_images.all().first()
        if image:
            return image.image.url
        return None
