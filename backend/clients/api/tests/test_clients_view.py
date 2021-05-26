import pytest
from backend.clients.models import Client
from backend.clients.tests.schemas import ClientSchema
from backend.clients.api.views import ClientsListAPIView


@pytest.fixture
def clients_url():
    return '/api/clients/'


@pytest.fixture
def clients_list():
    clients = [Client(name='R2d2'),
               Client(name='C3PO')]
    schema = ClientSchema(many=True)

    return schema.dump(clients)


def test_get_all_clients(client, clients_url, clients_list, mocker):
    mocked_view_queryset = mocker.patch.object(ClientsListAPIView, 'queryset')
    mocked_view_queryset.return_value = clients_list

    response = client.get(clients_url)
    assert response.status_code == 200
