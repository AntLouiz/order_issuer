from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from backend.orders.api.serializers import (
    OrderSerializer,
    OrderItemSerializer,
    ClientOrderSerializer,
)
from backend.orders.models import Order, OrderItem


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    @action(detail=True, methods=['get'])
    def items(self, request, pk=None):
        items = OrderItem.objects.filter(order=pk)

        serializer = OrderItemSerializer(items, many=True)
        return Response(serializer.data)


class CurrentClientOrderAPIView(RetrieveAPIView):
    serializer_class = OrderSerializer

    def get(self, request, client_pk, *args, **kwargs):
        current_order = get_object_or_404(Order, client__pk=client_pk, is_closed=False)

        serializer = self.serializer_class(current_order)
        return Response(serializer.data)


class ClientOrdersPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 20


class ClientOrdersListView(ListAPIView):
    serializer_class = ClientOrderSerializer
    queryset = Order.objects.all()
    pagination_class = ClientOrdersPagination

    def get(self, request, client_pk, *args, **kwargs):
        queryset = Order.objects.filter(client__pk=client_pk, is_closed=True)
        page = request.GET.get('page')

        try:
            page = self.paginate_queryset(queryset)
        except Exception:
            return Response('Pedidos não encontrados',
                            status.HTTP_404_NOT_FOUND)

        if page is None:
            return Response('Pedidos não encontrados',
                            status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(page, many=True)
        data = serializer.data
        return self.get_paginated_response(data)


class OrderItemViewSet(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer
    queryset = OrderItem.objects.all()

    def update(self, request, pk, *args, **kwargs):
        data = request.data
        item = OrderItem.objects.get(pk=pk)
        item.price = data['price']
        item.quantity = data['quantity']
        if item.is_bad_rentability():
            return Response("Item com rentabilidade ruim", 400)

        return super().update(request, pk, *args, **kwargs)
