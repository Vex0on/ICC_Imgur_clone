# Generated by Django 4.1.7 on 2023-04-10 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imgur', '0005_alter_image_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=models.ImageField(upload_to='images'),
        ),
    ]