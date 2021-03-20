from rest_framework.generics import ListAPIView, RetrieveAPIView
from backend.clients.models import Client
from backend.clients.api.serializers import ClientSerializer


class ClientsListAPIView(ListAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
