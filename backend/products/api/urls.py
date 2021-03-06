from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    path('', views.ProductsListAPIView.as_view(), name='products'),
]
