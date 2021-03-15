import pytest
from backend.products.models import Product
from backend.orders.models import Order, OrderItem
from backend.clients.models import Client


def test_instance():
    order = Order()
    assert isinstance(order, Order)


@pytest.fixture
def items(db):
    product = Product.objects.create(name='R2d2', price=100)
    order_items = [OrderItem.objects.create(sugested_price=100, product=product)]

    return order_items

@pytest.fixture
def client(db):
    client = Client.objects.create(name='Darth Vader')
    return client


def test_instance_fields(items, client, db):
    expected_fields = ['id',
                       'client_id',
                       'created_at',
                       'updated_at',
                       '_state']

    order_dict = {"client": client}
    order = Order.objects.create(client=client)
    print(items)
    for item in items:
        order.items.add(item)

    object_fields = order.__dict__.keys()

    assert set(object_fields) == set(expected_fields)
