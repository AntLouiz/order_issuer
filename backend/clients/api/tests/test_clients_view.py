import pytest
from backend.clients.api.views import ClientsListAPIView


@pytest.fixture
def clients_url():
    return '/api/clients/'

def test_get_all_clients(client, db, clients_url):
    response = client.get(clients_url)
    assert response.status_code == 200
