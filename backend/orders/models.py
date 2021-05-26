from django.db import models
from backend.clients.models import Client
from backend.products.models import Product


class Order(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    is_closed = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=False,
                                      auto_now_add=False,
                                      blank=True, null=True)


class OrderItem(models.Model):
    GREAT = 'GREAT'
    GOOD = 'GOOD'
    BAD = 'BAD'
    RENTABILITY_CHOICES = [
        (GREAT, 'Ótimo'),
        (GOOD, 'Bom'),
        (BAD, 'Ruim'),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rentability = models.CharField(
        max_length=10,
        choices=RENTABILITY_CHOICES,
        default=GOOD,
    )
    price = models.BigIntegerField()
    quantity = models.IntegerField(default=1)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        self.rentability = self.check_rentability()
        return super().save(*args, **kwargs)

    def check_rentability(self):
        product_price = self.product.price
        percent = 10
        tolerance = int((percent * product_price) / 100)
        tolerance_price = product_price - tolerance
        tolerance_range = range(tolerance_price, product_price + 1)

        rentability = OrderItem.BAD

        if self.price > product_price:
            rentability = OrderItem.GREAT
        elif self.price in tolerance_range:
            rentability = OrderItem.GOOD

        return rentability

    def is_bad_rentability(self):
        self.rentability = self.check_rentability()
        return self.rentability == self.BAD
