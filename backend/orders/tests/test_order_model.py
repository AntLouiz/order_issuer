import pytest
from backend.products.models import Product
from backend.orders.models import Order
from backend.clients.models import Client


def test_instance():
    order = Order()
    assert isinstance(order, Order)


@pytest.fixture
def products_list(db):
    products = [Product.objects.create(name='R2d2', price=100),
               Product.objects.create(name='C3PO', price=200)]

    return products

@pytest.fixture
def client(db):
    client = Client.objects.create(name='R2d2')
    return client


def test_instance_fields(products_list, client, db):
    expected_fields = ['id',
                       'client_id',
                       'created_at',
                       'updated_at',
                       '_state']

    order_dict = {"client": client}
    order = Order.objects.create(client=client)
    for product in products_list:
        order.products.add(product)

    object_fields = order.__dict__.keys()

    assert set(object_fields) == set(expected_fields)
