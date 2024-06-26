from django.db import models
from django.contrib.auth.models import BaseUserManager

from ...Profile.models import Profile
from ...Watchlist.models import Watchlist

class AccountManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)

        new_profile = Profile(account=user)
        new_profile.save()
        new_watchlist = Watchlist(account=user)
        new_watchlist.save()

        return user

    def create_superuser(self, email, password):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.is_staff = True
        user.is_active = True
        user.is_superuser = True
        user.save(using=self._db)
