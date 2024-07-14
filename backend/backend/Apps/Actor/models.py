from django.db import models
from django.utils.safestring import mark_safe

# Create your models here.
class Actor(models.Model):
    name = models.CharField(max_length=50)
    birthday = models.DateField(null=True, blank=True)
    deathday = models.DateField(null=True, blank=True)
    place_of_birth = models.CharField(max_length=100, null=True, blank=True)
    biography = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.name}"


class ActorImage(models.Model):
    image = models.ImageField(upload_to="actor/", blank=True, null=True)
    actor = models.ForeignKey(Actor, on_delete=models.CASCADE, related_name="actor_images")

    def __str__(self) -> str:
        return f"{self.actor.name}"

    def image_tag(self):
        return mark_safe('<img src="http://image.tmdb.org/t/p/w185%s" width="150" height="150" />' % (self.image))
    image_tag.short_description = 'Image'
    image_tag.allow_tags = True
