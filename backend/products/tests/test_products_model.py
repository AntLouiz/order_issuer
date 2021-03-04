import pytest
from backend.products.models import Product


@pytest.fixture
def product():
    product = Product()
    return product


def test_instance(product):
    assert isinstance(product, Product)


def test_instance_fields_with_multiple_attr():
    expected_fields = ['id',
                       'name',
                       'price',
                       'multiple',
                       '_state']

    product_dict = {"name": "X-Wing",
                    "price": 6000000,
                    "multiple": 2}
    product = Product(**product_dict)
    object_fields = product.__dict__.keys()

    assert set(object_fields) == set(expected_fields)


def test_instance_without_multiple_attr():
    product_dict = {"name": "Super​ ​Star​ ​Destroyer",
                    "price": 457000000}
    product = Product(**product_dict)

    assert isinstance(product, Product)
