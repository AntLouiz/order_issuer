import pytest
from rest_framework.serializers import ValidationError
from backend.products.models import Product
from backend.orders.models import Order, OrderItem
from backend.clients.models import Client
from backend.orders.api.serializers import OrderItemSerializer


@pytest.fixture
def client():
    client = Client(name='Darth Vader')
    return client


@pytest.fixture
def product():
    product = Product(name='R2d2', price=100)
    return product


@pytest.fixture
def order(mocker, client):
    order = Order(client=client)
    mocked_save_method = mocker.patch.object(OrderItem, 'save')
    mocked_save_method.return_value = None

    return order


@pytest.fixture
def order_item(product, order):
    item = {'id': 1,
            'product': product,
            'price': 300,
            'quantity': 1,
            'order': order}
    return item


def test_create_method(order_item):
    order_item = OrderItemSerializer(data=order_item).create(order_item)
    assert order_item.rentability == OrderItem.GREAT


def test_create_method_bad_rentability(order_item):
    order_item['price'] = 10
    with pytest.raises(ValidationError):
        OrderItemSerializer(data=order_item).create(order_item)
