from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.
class Rate(models.Model):
    account = models.ForeignKey("Account.Account", on_delete=models.CASCADE, related_name="account_rate")
    movie = models.ForeignKey("Movie.Movie", on_delete=models.CASCADE, related_name="movie_rate")
    rate = models.IntegerField(default=0, validators=[MaxValueValidator(5), MinValueValidator(1)])
    timestamp = models.DateTimeField(auto_now_add=True)


