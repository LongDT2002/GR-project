from django.db import models
from django_countries.fields import CountryField


class Profile(models.Model):
    account = models.OneToOneField("Account.Account", on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    country = CountryField(blank_label="(select country)", blank=True, null=True)
    
    def __str__(self) -> str:
        return self.first_name + " " + self.last_name

    def get_country_display(self):
        return self.country.code
