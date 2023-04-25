# Generated by Django 4.1.7 on 2023-04-25 18:07

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImgurUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('phone_number', models.CharField(max_length=9, null=True, unique=True)),
                ('email', models.EmailField(max_length=254, null=True, unique=True)),
                ('username', models.CharField(blank=True, max_length=45, null=True, unique=True)),
                ('password', models.CharField(blank=True, max_length=255)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('record_id', models.PositiveIntegerField()),
                ('text', models.CharField(max_length=140)),
                ('like_count', models.IntegerField(default=0)),
                ('dislike_count', models.IntegerField(default=0)),
                ('imgur_user', models.ForeignKey(default=None, on_delete=django.db.models.deletion.SET_DEFAULT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Subcomment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('record_id', models.PositiveIntegerField()),
                ('text', models.CharField(max_length=140)),
                ('like_count', models.IntegerField(default=0)),
                ('dislike_count', models.IntegerField(default=0)),
                ('comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='imgur.comment')),
                ('user', models.ForeignKey(default=None, on_delete=django.db.models.deletion.SET_DEFAULT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Reaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reaction', models.BooleanField(null=True)),
                ('record_id', models.PositiveIntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('record_id', models.PositiveIntegerField()),
                ('title', models.CharField(max_length=45)),
                ('description', models.CharField(max_length=45)),
                ('tag', models.CharField(max_length=45)),
                ('expirationDate', models.DateTimeField()),
                ('like_count', models.IntegerField(default=0)),
                ('dislike_count', models.IntegerField(default=0)),
                ('imgur_user', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_DEFAULT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=45, null=True)),
                ('size', models.CharField(max_length=45, null=True)),
                ('mime_type', models.CharField(max_length=45, null=True)),
                ('path', models.CharField(max_length=90, null=True)),
                ('image', models.ImageField(upload_to='images')),
                ('post', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='imgur.post')),
            ],
        ),
        migrations.AddField(
            model_name='comment',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='imgur.post'),
        ),
    ]
