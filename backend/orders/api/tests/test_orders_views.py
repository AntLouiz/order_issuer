import pytest


@pytest.fixture
def orders_url():
    return '/orders/'


def test_order_great_rentability_validation(client, orders_url, mocker):
    response = client.get(orders_url)
    assert response.status_code == 200
