# Generated by Django 3.2.7 on 2022-04-07 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_auto_20220407_1606'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='duration',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
