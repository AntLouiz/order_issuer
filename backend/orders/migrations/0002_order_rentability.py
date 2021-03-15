# Generated by Django 3.1.7 on 2021-03-15 11:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='rentability',
            field=models.CharField(choices=[('GREAT', 'Great'), ('GOOD', 'Good'), ('BAD', 'Bad')], default='GOOD', max_length=10),
        ),
    ]