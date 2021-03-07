from rest_framework import status, viewsets
from backend.orders.api.serializers import OrderSerializer
from backend.orders.models import Order


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
