from django.conf import settings
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    # Django admin
    path('admin/', admin.site.urls),
    # Local apps
    path('', include('backend.core.urls', namespace='core')),
    path('api/clients/', include('backend.clients.api.urls', namespace='clients')),
    path('api/products/', include('backend.products.api.urls', namespace='products')),
    path('api/orders/', include('backend.orders.api.urls', namespace='orders')),
]
