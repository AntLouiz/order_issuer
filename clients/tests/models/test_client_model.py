import pytest
from clients.models import Client


@pytest.fixture
def client():
    client = Client()
    return client


def test_instance(client):
    assert isinstance(client, Client)


def test_instance_fields(client, db):
    expected_fields = ['id',
                       'name',
                       '_state']

    client = Client.objects.create(name='Darth Vader')
    object_fields = client.__dict__.keys()

    assert set(object_fields) == set(expected_fields)
