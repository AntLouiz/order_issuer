# Generated by Django 3.1.7 on 2021-03-15 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_delete_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='offer',
            field=models.BooleanField(default=False),
        ),
    ]
