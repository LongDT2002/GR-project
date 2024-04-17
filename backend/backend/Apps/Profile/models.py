from django.db import models

# Create your models here.
class Profile(models.Model):
    account = models.OneToOneField("Account.Account", on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    bio = models.TextField(null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    country = models.CharField(max_length=50)
    
    def __str__(self) -> str:
        return self.first_name + " " + self.last_name