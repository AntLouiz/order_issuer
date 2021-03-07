from django.apps import AppConfig
from settings.base import BASE_DIR


class OrdersConfig(AppConfig):
    name = 'backend.orders'
    path = BASE_DIR.child('backend', 'orders')
    verbose_name = 'Orders Application'
