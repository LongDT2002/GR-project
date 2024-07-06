from django.db import models
import datetime

from ..Account.models import Account
from ..Movie.models import Movie


# Create your models here.
class Review(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='review_movie')
    title = models.CharField(max_length=255)
    content = models.TextField(max_length=2000, blank=True)
    spoiled = models.BooleanField(default=False)
    timestamp = models.DateField(default=datetime.date.today)


class Vote(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='vote_review')
    vote = models.BooleanField(default=False)
