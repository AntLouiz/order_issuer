from django.contrib import admin
from backend.orders.models import Order, OrderItem


admin.site.register(Order)
admin.site.register(OrderItem)
