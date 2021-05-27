import pytest
from backend.products.models import Product
from backend.orders.models import Order, OrderItem
from backend.clients.models import Client
from backend.orders.api.serializers import ClientOrderSerializer


@pytest.fixture
def client():
    client = Client(name='Darth Vader')
    return client


@pytest.fixture
def product():
    product = Product(name='R2d2', price=100)
    return product


@pytest.fixture
def items():
    items = [OrderItem(price=100, quantity=2),
             OrderItem(price=211, quantity=2)]
    return items


@pytest.fixture
def client_order(mocker, client, product, items):
    order = {'id': 1, 'client': 1, 'is_closed': True, 'updated_at': None}

    mocked_save_method = mocker.patch.object(OrderItem, 'objects')
    mocked_save_method.filter.return_value = items

    return order


@pytest.fixture
def serializer(client_order):
    serializer = ClientOrderSerializer(data=client_order)
    return serializer


def test_get_items_method(serializer, items):
    order = Order(serializer.initial_data)
    serializer_items = serializer.get_items(order)
    assert len(serializer_items) == len(items)


def test_get_subtotal_method(serializer, items):
    order = Order(serializer.initial_data)
    subtotal = serializer.get_subtotal(order)
    assert subtotal == sum([i.price * i.quantity for i in items])
