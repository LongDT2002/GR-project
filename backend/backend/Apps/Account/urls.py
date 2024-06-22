from django.urls import path, include
from .views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    # register: users/
    # activate: users/activation/
    # change: users/set_password/
    # reset: users/reset_password/
    # reset confirm: users/reset_password_confirm/
    path('auth/', include('djoser.social.urls')),
    path('auth/', include('djoser.urls.jwt')),
    # login: jwt/create/
    # refresh: jwt/refresh/
    # verify: jwt/verify/
    path('auth/api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
