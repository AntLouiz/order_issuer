# Generated by Django 3.1.7 on 2021-05-24 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0012_auto_20210524_2048'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='price',
            field=models.BigIntegerField(),
        ),
    ]