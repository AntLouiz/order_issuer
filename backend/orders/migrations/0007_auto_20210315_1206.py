# Generated by Django 3.1.7 on 2021-03-15 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0006_auto_20210315_1040'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='items',
            field=models.ManyToManyField(blank=True, to='orders.OrderItem'),
        ),
    ]
