from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from backend.orders.api.views import OrderViewSet, OrderItemViewSet


router = DefaultRouter()
router.register('orders', OrderViewSet, basename='order')
router.register('items', OrderItemViewSet, basename='item')


urlpatterns = [
    # Django admin
    path('admin/', admin.site.urls),
    # Local apps
    path('', include('backend.core.urls', namespace='core')),
    path('api/', include(router.urls)),
    path('api/clients/',
         include('backend.clients.api.urls', namespace='clients')),
    path('api/products/',
         include('backend.products.api.urls', namespace='products')),
    path('api/orders/',
         include('backend.orders.api.urls', namespace='orders')),
]
