from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.contrib.auth.hashers import check_password, make_password
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from .models import ImgurUser, Image


# Modele
class UserModelTest(TestCase):
    def setUp(self):
        self.UserModel = get_user_model()

    def test_create_user(self):
        password = "password123"
        user = self.UserModel.objects.create_user(
            username="testuser@gmail.com", password=password
        )
        # asserty sprawdzaja czy np. user.username zgadza sie z "testuser@gmail.com"
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
        # check_password sprawdza czy haslo zostało zapisane jako zahaszowane
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


# Widok ImgurUser(Custom)
class ImgurUserTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = ImgurUser.objects.create(
            username="testlogin@gmail.com",
            password=make_password("testpassword")
        )

    def test_register_user(self):
        url = reverse("register_user")  # funkcja reverse do uzyskania URL'a
        data = {
            "username": "testuser1@gmail.com",
            "password": "password123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_user_with_existing_username(self):
        url = reverse("register_user")
        data = {
            "username": "testuser1@gmail.com",
            "password": "password123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_register_user_with_missing_fields(self):
        url = reverse("register_user")
        data = {"username": "testuser"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_login_user(self):
        url = reverse("login_user")
        data = {
            "username": "testlogin@gmail.com",
            "password": "testpassword",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = ImgurUser.objects.get(username="testlogin@gmail.com")
        self.assertTrue(check_password(data["password"], user.password))

    def test_get_imgur_users(self):
        url = reverse("imgurUsers")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_imgur_user(self):
        user_id = self.user.id
        url = reverse("imgurUser", args=[user_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_imgur_user(self):
        user_id = self.user.id
        url = reverse("delete-user", args=[user_id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
