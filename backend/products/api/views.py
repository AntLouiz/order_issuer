from rest_framework.generics import ListAPIView
from backend.products.models import Product
from backend.products.api.serializers import ProductSerializer


class ProductsListAPIView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
