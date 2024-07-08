from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/rate/', views.RatePersonal.as_view(), name='rate'),
    path('all_ratings/personal/', views.AllPersonalRateView.as_view(), name='personal_rate'),
]

