from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    multiple = models.IntegerField(blank=True, null=True)
