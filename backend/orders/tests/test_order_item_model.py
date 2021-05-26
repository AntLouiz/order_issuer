import pytest
from backend.clients.models import Client
from backend.products.models import Product
from backend.orders.models import Order, OrderItem


@pytest.fixture
def order(db):
    client = Client.objects.create(name='Darth Vader')
    return Order.objects.create(client=client)


def test_order_item_check_rentability_method(db, order):
    product_price = 100
    product = Product.objects.create(name='C3PO', price=product_price)

    order_item = OrderItem(order=order, price=product_price, product=product, quantity=2)
    rentability = order_item.check_rentability()

    assert rentability == OrderItem.GOOD


def test_order_item_is_bad_rentability_property(db, order):
    product_price = 100
    product = Product.objects.create(name='C3PO', price=product_price)

    order_item = OrderItem(order=order, price=product_price, product=product, quantity=2)
    assert order_item.is_bad_rentability is False


def test_order_item_great_rentability(db, order):
    product_price = 100
    product = Product.objects.create(name='R2d2', price=product_price)

    item_price = product_price + 10
    order_item = OrderItem(order=order, price=item_price, product=product, quantity=2)
    order_item.save()

    assert order_item.rentability == OrderItem.GREAT


def test_order_item_good_rentability(db, order):
    product_price = 100
    product = Product.objects.create(name='C3PO', price=product_price)

    item_price = 90
    order_item = OrderItem(order=order, price=item_price, product=product, quantity=2)
    order_item.save()

    assert order_item.rentability == OrderItem.GOOD


def test_order_item_bad_rentability(db, order):
    product_price = 100
    product = Product.objects.create(name='R2d2', price=product_price)

    item_price = 89
    order_item = OrderItem(order=order, price=item_price, product=product, quantity=2)
    order_item.save()

    assert order_item.rentability == OrderItem.BAD


def test_order_item_rentability_more_than_product_price(db, order):
    product_price = 100
    product = Product.objects.create(name='R2d2', price=product_price)

    item_price = product_price * 2
    order_item = OrderItem(order=order, price=item_price, product=product, quantity=2)
    order_item.save()

    assert order_item.rentability == OrderItem.GREAT


def test_order_item_rentability_with_equal_product_price(db, order):
    product_price = 100
    product = Product.objects.create(name='C3PO', price=product_price)

    order_item = OrderItem(order=order, price=product_price, product=product, quantity=2)
    order_item.save()

    assert order_item.rentability == OrderItem.GOOD
