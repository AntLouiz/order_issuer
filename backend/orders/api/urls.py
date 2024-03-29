from django.urls import path
from . import views

app_name = 'orders'

urlpatterns = [
    path('clients/<int:client_pk>/',
         views.ClientOrdersListView.as_view(),
         name='client-orders'),
    path('clients/<int:client_pk>/current/',
         views.CurrentClientOrderAPIView.as_view(),
         name='current'),
]
