from django.contrib import admin
from django.contrib.auth.models import Group
from social_django.models import UserSocialAuth, Nonce, Association
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken


admin.site.unregister(Group)
admin.site.unregister(UserSocialAuth)
admin.site.unregister(Nonce)
admin.site.unregister(Association)
admin.site.unregister(BlacklistedToken)
admin.site.unregister(OutstandingToken)

