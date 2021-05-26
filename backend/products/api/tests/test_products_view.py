import pytest
from backend.products.models import Product
from backend.products.tests.schemas import ProductSchema
from backend.products.api.views import ProductsListAPIView


@pytest.fixture
def products_url():
    return '/api/products/'


@pytest.fixture
def products_list():
    products = [Product(name='R2d2'),
                Product(name='C3PO')]
    schema = ProductSchema(many=True)

    return schema.dump(products)


def test_get_all_products(client, products_url, products_list, mocker):
    mocked_view_queryset = mocker.patch.object(ProductsListAPIView,
                                               'filter_queryset')
    mocked_view_queryset.return_value = products_list

    response = client.get(products_url)
    assert response.status_code == 200
