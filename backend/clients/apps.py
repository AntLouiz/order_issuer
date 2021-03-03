from django.apps import AppConfig
from settings.base import BASE_DIR


class ClientsConfig(AppConfig):
    name = 'backend.clients'
    path = BASE_DIR.child('backend', 'clients')
    verbose_name = 'Clients Application'
