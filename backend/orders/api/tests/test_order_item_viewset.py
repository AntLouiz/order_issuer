import pytest
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from backend.products.models import Product
from backend.orders.models import Order, OrderItem
from backend.orders.api.serializers import OrderItemSerializer
from backend.orders.api.views import OrderItemViewSet


@pytest.fixture
def product():
    product = Product(name='R2d2', price=100, pk=1)
    return product

@pytest.fixture
def order_item_url():
    return '/api/items/'


@pytest.fixture
def item(mocker, product):
    item = OrderItem(price=8999999, quantity=2, product=product)
    mocked_get_item = mocker.patch.object(OrderItem, 'objects')
    mocked_get_item.get.return_value = item

    mocked_save_method = mocker.patch.object(ModelViewSet, 'update')
    mocked_save_method.return_value = Response("Item atualizado", 200)
    return item


def test_update_order_item(mocker, client, order_item_url, product, item):
    order = Order(pk=1)

    url = f"{order_item_url}{order.pk}/"
    response = client.patch(url,
                            data={"price": 100, 'quantity': 2, "product": product.pk},
                            content_type='application/json')
    assert response.status_code == 200


def test_update_order_item_bad_rentability(mocker, client, order_item_url, product, item):
    order = Order(pk=1)

    url = f"{order_item_url}{order.pk}/"
    response = client.patch(url,
                            data={"price": 1, 'quantity': 2, "product": product.pk},
                            content_type='application/json')

    assert response.status_code == 400
