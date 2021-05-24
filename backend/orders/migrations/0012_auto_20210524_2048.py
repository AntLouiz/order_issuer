# Generated by Django 3.1.7 on 2021-05-24 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0011_order_is_closed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='rentability',
            field=models.CharField(choices=[('GREAT', 'Ótimo'), ('GOOD', 'Bom'), ('BAD', 'Ruim')], default='GOOD', max_length=10),
        ),
    ]