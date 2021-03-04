from django.apps import AppConfig


class ProductsConfig(AppConfig):
    name = 'backend.products'
    path = BASE_DIR.child('backend', 'products')
    verbose_name = 'Products Application'
