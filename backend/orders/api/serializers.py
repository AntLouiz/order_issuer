from rest_framework import serializers
from backend.orders.models import Order


class OrderSerializer(serializers.ModelSerializer):
    updated_at = serializers.DateTimeField(read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'products', 'client', 'created_at', 'updated_at']
