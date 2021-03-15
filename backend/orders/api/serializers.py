from rest_framework import serializers
from backend.products.api.serializers import ProductSerializer
from backend.orders.models import OrderItem, Order


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'sugested_price', 'rentability']


class OrderSerializer(serializers.ModelSerializer):
    updated_at = serializers.DateTimeField(read_only=True)
    items = OrderItemSerializer(many=True)
    class Meta:
        model = Order
        fields = ['id', 'items', 'client', 'created_at', 'updated_at']
