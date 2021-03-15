from django.db import models
from backend.clients.models import Client
from backend.products.models import Product


class OrderItem(models.Model):
    GREAT = 'GREAT'
    GOOD = 'GOOD'
    BAD = 'BAD'
    RENTABILITY_CHOICES = [
        (GREAT, 'Great'),
        (GOOD, 'Good'),
        (BAD, 'Bad'),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rentability = models.CharField(
        max_length=10,
        choices=RENTABILITY_CHOICES,
        default=GOOD,
    )
    sugested_price = models.IntegerField()


class Order(models.Model):
    items = models.ManyToManyField(OrderItem)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=False, auto_now_add=False, blank=True, null=True)
