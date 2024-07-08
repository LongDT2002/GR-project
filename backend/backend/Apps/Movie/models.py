from django.db import models
from django.db.models import Avg
from django_countries.fields import CountryField

from ..Rate.models import Rate


class Genre(models.Model):
    GENRE_CHOICES = [
        ('Action', 'Action'),
        ('Adventure', 'Adventure'),
        ('Animation', 'Animation'),
        ('Biography', 'Biography'),
        ('Comedy', 'Comedy'),
        ('Crime', 'Crime'),
        ('Documentary', 'Documentary'),
        ('Drama', 'Drama'),
        ('Family', 'Family'),
        ('Fantasy', 'Fantasy'),
        ('Film-Noir', 'Film-Noir'),
        ('Game-Show', 'Game-Show'),
        ('History', 'History'),
        ('Horror', 'Horror'),
        ('Music', 'Music'),
        ('Musical', 'Musical'),
        ('Mystery', 'Mystery'),
        ('News', 'News'),
        ('Reality-TV', 'Reality-TV'),
        ('Romance', 'Romance'),
        ('Sci-Fi', 'Sci-Fi'),
        ('Short', 'Short'),
        ('Sport', 'Sport'),
        ('Talk-Show', 'Talk-Show'),
        ('Thriller', 'Thriller'),
        ('War', 'War'),
        ('Western', 'Western'),
    ]

    name = models.CharField(max_length=50, choices=GENRE_CHOICES)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.DateField()
    duration = models.IntegerField()
    ave_rate = models.FloatField(default=0.0)
    summary = models.CharField(max_length=2000, blank=True, null=True)
    synopsis = models.TextField(max_length=20000, blank=True, null=True)
    revenue = models.BigIntegerField(default=0)
    budget = models.BigIntegerField(default=0)
    original_country = CountryField(blank_label="(select country)", blank=True)
    director = models.ForeignKey("Director.Director", on_delete=models.CASCADE, related_name="movie_director", null=True)

    def __str__(self):
        return self.title

    def average_rating(self) -> float:
        rate = Rate.objects.filter(movie=self).aggregate(Avg('rate'))['rate__avg']
        rate = round(rate, 1)
        if rate is None:
            return 0.0
        return rate
    

class Movie_Actor(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="movie_actor")
    actor = models.ForeignKey("Actor.Actor", on_delete=models.CASCADE, related_name="actor_movie")
    character_name = models.CharField(max_length=50)


class Movie_Genre(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="movie_genre")
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)


class MovieVideo(models.Model):
    TYPE_CHOICES = [
        ("Trailer", "Trailer"),
        ("Teaser", "Teaser"),
        ("Clip", "Clip"),
        ("Behind the Scenes", "Behind the Scenes"),
        ("Blooper", "Blooper"),
        ("Featurette", "Featurette"),
        ("Opening Credits", "Opening Credits"),
    ]

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="movievideo_set")
    title = models.CharField(max_length=200)
    link = models.FileField(null=True, blank=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)

    def __str__(self):
        return self.title


class MovieImage(models.Model):
    TYPE_CHOICES = [
        ("backdrops", "backdrop"),
        ("posters", "poster"),
        ("logos", "logo"),
    ]
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="movieimage_set")
    image = models.ImageField(upload_to="movie/", null=True, blank=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
