from backend.clients.api.serializers import ClientSerializer

def test_clients_serializer():
    serializer = ClientSerializer(data={"name": "Luiz"})

    assert serializer.is_valid() == True
