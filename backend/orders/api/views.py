from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from django.shortcuts import get_object_or_404
from backend.orders.api.serializers import OrderSerializer, OrderItemSerializer
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

class ClientOrdersListView(ListAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def get(self, request, client_pk, *args, **kwargs):
        orders = Order.objects.filter(client__pk=client_pk)

        serializer = self.serializer_class(orders, many=True)
        return Response(serializer.data)


class OrderItemViewSet(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer
    queryset = OrderItem.objects.all()
