# Generated by Django 4.1.7 on 2023-03-08 21:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ImgurUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=45)),
                ('password', models.CharField(max_length=45)),
                ('phone_number', models.IntegerField(max_length=9)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=45)),
                ('description', models.CharField(max_length=45)),
                ('tag', models.CharField(max_length=45)),
                ('expirationDate', models.DateTimeField()),
                ('imgurUser', models.ForeignKey(default=None, on_delete=django.db.models.deletion.SET_DEFAULT, to='imgur.imguruser')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=140)),
                ('imgurUser', models.ForeignKey(default=None, on_delete=django.db.models.deletion.SET_DEFAULT, to='imgur.imguruser')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='imgur.post')),
            ],
        ),
    ]
