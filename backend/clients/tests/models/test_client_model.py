import pytest
from backend.clients.models import Client


def test_instance():
    client = Client()
    assert isinstance(client, Client)


def test_instance_fields():
    expected_fields = ['id',
                       'name',
                       '_state']

    client = Client(name='Darth Vader')
    object_fields = client.__dict__.keys()

    assert set(object_fields) == set(expected_fields)
