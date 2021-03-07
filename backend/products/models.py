from django.db import models
from backend.clients.models import Client


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    multiple = models.IntegerField(blank=True, null=True)


class Order(models.Model):
    products = models.ManyToManyField(Product)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=False, auto_now_add=False, blank=True, null=True)
