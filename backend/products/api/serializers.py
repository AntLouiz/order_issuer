from rest_framework import serializers
from backend.products.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'multiple', 'image_url', 'is_offer']
