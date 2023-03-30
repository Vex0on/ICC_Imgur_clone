from io import BytesIO

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase
from .models import ImgurUser, Image


class UserModelTest(TestCase):
    def setUp(self):
        self.UserModel = get_user_model()

    def test_create_user(self):
        password = "password123"
        user = self.UserModel.objects.create_user(
            username="testuser@gmail.com", password=password
        )
        self.assertEqual(user.username, "testuser@gmail.com")
        self.assertTrue(check_password(password, user.password))
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        password = "password123"
        superuser = self.UserModel.objects.create_superuser(
            username="testsuperuser@gmail.com", password=password
        )
        self.assertEqual(superuser.username, "testsuperuser@gmail.com")
        self.assertTrue(check_password(password, superuser.password))
        self.assertTrue(superuser.is_active)
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)


class ImgurUserModelTest(TestCase):
    def setUp(self):
        self.UserModel = get_user_model()

    def test_create_imguruser(self):
        user = self.UserModel.objects.create_user(
            username="testuser@gmail.com", password="password123"
        )
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

        imguruser = ImgurUser.objects.create(
            id=user.id,
            phone_number="123456789",
            username=user.username,
            email=user.email,
            password=user.password,
            last_login=user.last_login,
        )
        self.assertEqual(imguruser.phone_number, "123456789")


class ImageModelTest(TestCase):
    def setUp(self):
        self.image_data = {
            "name": "testimage.png",
            "size": "100x100",
            "mime_type": "image/png",
            "path": "/path/to/testimage.png",
            "image": SimpleUploadedFile(
                "testimage.png", b"binarydata", content_type="image/png"
            ),
        }

    def test_image_model(self):
        image = Image.objects.create(**self.image_data)

        self.assertEqual(image.name, "testimage.png")
        self.assertEqual(image.size, "100x100")
        self.assertEqual(image.mime_type, "image/png")
        self.assertEqual(image.path, "/path/to/testimage.png")
        self.assertEqual(image.image.read(), b"binarydata")
