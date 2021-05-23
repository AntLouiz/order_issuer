from django.db.models import F
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

    def create(self, validated_data):
        order_item = OrderItem(**validated_data)
        if order_item.is_bad_rentability():
            raise serializers.ValidationError('Item com rentabilidade ruim.')

        order_item.save()
        return order_item


class ClientOrderSerializer(serializers.ModelSerializer):
    updated_at = serializers.DateTimeField(read_only=True)
    items = serializers.SerializerMethodField()
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'client', 'created_at', 'updated_at', 'is_closed', 'items', 'subtotal']

    def get_items(self, obj):
        queryset = OrderItem.objects.filter(order=obj.pk)
        serialized_items = OrderItemSerializer(queryset, many=True)
        items = serialized_items.data

        return items

    def get_subtotal(self, obj):
        items_subtotals = [item['price'] * item['quantity'] for item in self.get_items(obj)]
        return sum(items_subtotals)
