from django.db import models
from backend.clients.models import Client
from backend.products.models import Product


class Order(models.Model):
    products = models.ManyToManyField(Product)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=False, auto_now_add=False, blank=True, null=True)
