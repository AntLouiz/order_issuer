from django.urls import path, include
from rest_framework import routers
from . import views

app_name = 'orders'

urlpatterns = [
    path('clients/<int:client_pk>/current/', views.CurrentClientOrderAPIView.as_view(), name='current'),
]
