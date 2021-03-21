import pytest
from backend.products.models import Product
from backend.orders.models import Order, OrderItem
from backend.clients.models import Client


def test_instance():
    order = Order()
    assert isinstance(order, Order)


@pytest.fixture
def client(db):
    client = Client.objects.create(name='Darth Vader')
    return client


def test_instance_fields(client, db):
    expected_fields = ['id',
                       'client_id',
                       'created_at',
                       'updated_at',
                       'is_closed',
                       '_state']

    order_dict = {"client": client}
    order = Order.objects.create(client=client)

    object_fields = order.__dict__.keys()

    assert set(object_fields) == set(expected_fields)
