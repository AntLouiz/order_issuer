from rest_framework import serializers
from backend.products.api.serializers import ProductSerializer
from backend.orders.models import OrderItem, Order


class OrderSerializer(serializers.ModelSerializer):
    updated_at = serializers.DateTimeField(read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'client', 'created_at', 'updated_at', 'is_closed']


class OrderItemSerializer(serializers.ModelSerializer):
    productItem = ProductSerializer(source='product', read_only=True)
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'productItem', 'price', 'quantity', 'rentability', 'order']
