from django.apps import AppConfig
from settings.base import BASE_DIR


class ProductsConfig(AppConfig):
    name = 'backend.products'
    path = BASE_DIR.child('backend', 'products')
    verbose_name = 'Products Application'
