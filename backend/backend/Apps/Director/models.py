from django.db import models
from django.utils.safestring import mark_safe

# Create your models here.
class Director(models.Model):
    name = models.CharField(max_length=50)
    birthday = models.DateField(null=True, blank=True)
    deathday = models.DateField(null=True, blank=True)
    place_of_birth = models.CharField(null=True, blank=True, max_length=50)
    biography = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.name}"


class DirectorImage(models.Model):
    director = models.ForeignKey(Director, on_delete=models.CASCADE, related_name="director_images")
    image = models.ImageField(upload_to="director/", blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.director.name}"
    
    def image_tag(self):
        from django.utils.html import escape
        return mark_safe('<img src="http://image.tmdb.org/t/p/w185%s" width="150" height="150" />' % (self.image))
    image_tag.short_description = 'Image'
    image_tag.allow_tags = True
