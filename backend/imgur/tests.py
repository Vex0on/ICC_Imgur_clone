import os
import uuid

from allauth.account.models import EmailAddress
from allauth.account.signals import email_confirmed
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.hashers import check_password, make_password
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from .models import ImgurUser, Image, Post, Comment
from .serializers import ImageSerializer


# Modele
class ImgurUserModelTest(TestCase):
    def setUp(self):
        self.user_data = {
            "email": "test@example.com",
            "username": "test@example.com",
            "password": "Password123",
            "phone_number": "123456789",
        }

    def test_create_user(self):
        password = "Password123"
        user = ImgurUser.objects.create_user(
            email="test@example.com",
            username="test@example.com",
            phone_number="123456789",
            password=password,
        )
        self.assertEqual(user.email, "test@example.com")
        self.assertEqual(user.username, "test@example.com")
        self.assertEqual(user.phone_number, "123456789")
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(check_password(password, user.password))

    def test_create_superuser(self):
        password = "Password123"
        superuser = ImgurUser.objects.create_superuser(
            email="testsuperuser@gmail.com",
            username="testsuperuser@gmail.com",
            phone_number="123456789",
            password=password,
        )
        self.assertEqual(superuser.email, "testsuperuser@gmail.com")
        self.assertEqual(superuser.username, "testsuperuser@gmail.com")
        self.assertEqual(superuser.phone_number, "123456789")
        self.assertTrue(superuser.is_active)
        self.assertTrue(superuser.is_superuser)
        self.assertTrue(check_password(password, superuser.password))


# Widok ImgurUser(Custom)
class ImgurUserTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = ImgurUser.objects.create(
            email="testlogin@gmail.com", password=make_password("testpassword")
        )

    # Rejestracja
    def test_register_user(self):
        url = reverse("register_user")  # funkcja reverse do uzyskania URL'a
        data = {
            "email": "testuser1@gmail.com",
            "password": "Password123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_user_without_domain(self):
        url = reverse("register_user")
        data = {
            "email": "testuser",
            "password": "Password123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_register_user_with_too_short_password(self):
        url = reverse("register_user")
        data = {
            "email": "testuser2@gmail.com",
            "password": "Pass",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_register_user_password_without_capital_letter(self):
        url = reverse("register_user")
        data = {
            "email": "testuser3@gmail.com",
            "password": "password123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_register_user_with_existing_username(self):
        url = reverse("register_user")
        data = {
            "email": "testuser1@gmail.com",
            "password": "Password123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_register_user_with_missing_fields(self):
        url = reverse("register_user")
        data = {"email": "testuser"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    # Logowanie
    def test_login_user(self):
        url = reverse("login_user")
        data = {
            "email": "testlogin@gmail.com",
            "password": "testpassword",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = ImgurUser.objects.get(email="testlogin@gmail.com")
        self.assertTrue(check_password(data["password"], user.password))

    def test_login_with_incorrect_credentials(self):
        url = reverse("login_user")
        data = {
            "email": "invaliduser@gmail.com",
            "password": "incorrectpassword",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # GET
    def test_get_imgur_users(self):
        url = reverse("imgurUsers")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_imgur_user(self):
        user_id = self.user.id
        url = reverse("imgurUser", args=[user_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_nonexistent_imgur_user(self):
        url = reverse("imgurUser", args=[999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # Delete
    def test_delete_imgur_user(self):
        user_id = self.user.id
        url = reverse("delete-user", args=[user_id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_nonexistent_imgur_user(self):
        user_id = self.user.id
        url = reverse("delete-user", args=[999])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # Update
    def test_update_imgur_user(self):
        url = reverse("update-user", kwargs={"pk": self.user.id})
        data = {
            "username": "newusername",
            "email": "newemail@example.com",
            "password": "Newpassword123",
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = ImgurUser.objects.get(id=self.user.id)
        self.assertEqual(user.username, data["username"])
        self.assertEqual(user.email, data["email"])

    def test_update_imgur_user_not_found(self):
        url = reverse("update-user", args=[999])
        data = {"email": "newemail@test.com", "password": "newpassword123"}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_imgur_user_bad_request(self):
        user = ImgurUser.objects.create(
            email="testuser@test.com", password="password123"
        )
        url = reverse("update-user", args=[user.id])
        data = {"email": "newemail@test.com", "password": ""}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


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

    def test_create_image_with_invalid_data(self):
        invalid_data = {
            "name": "invalid_image.png",
            "size": "200x200",
            "mime_type": "image/png",
        }
        response = self.client.post(
            reverse("add-image"), data=invalid_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_get_images(self):
        self.url_get_images = reverse("images")
        response = self.client.get(self.url_get_images)
        images = Image.objects.all()
        serializer = ImageSerializer(images, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_image(self):
        image = Image.objects.create(**self.image_data)
        url = reverse("image", args=[1])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_image_not_found(self):
        url = reverse("image", args=[999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_nonexistent_image(self):
        response = self.client.delete("/api/images/123456/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


# Widok FullPost
class FullPostTestCase(TestCase):
    def setUp(self):
        self.post = Post.objects.create(
            title="Avatar steam",
            description="Kozacki avatar na steam",
            tag="Avatary",
            expirationDate="2023-05-27T21:22:25.429235Z",
            like_count=0,
            dislike_count=0,
        )

    def test_get_full_post(self):
        response = self.client.get(reverse("full-post", args=[self.post.id]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.post.title)
        self.assertContains(response, self.post.description)
        self.assertContains(response, self.post.tag)
        self.assertContains(response, self.post.expirationDate)
        self.assertContains(response, self.post.like_count)
        self.assertContains(response, self.post.dislike_count)

    def test_get_full_post_not_found(self):
        fake_id = 9999
        response = self.client.get(reverse("full-post", args=[fake_id]))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {"message": "HTTP_404_NOT_FOUND"})

    def test_get_full_posts(self):
        response = self.client.get(reverse("full-posts"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), Post.objects.count())


# Widok Comment
class CommentTestCase(TestCase):
    def setUp(self):
        user = ImgurUser.objects.create(
            email="testlogin@gmail.com", password=make_password("testpassword")
        )
        post = Post.objects.create(
            title="Avatar steam",
            description="Kozacki avatar na steam",
            tag="Avatary",
            expirationDate="2023-05-27T21:22:25.429235Z",
            like_count=0,
            dislike_count=0,
        )

        self.comment = Comment.objects.create(
            id=1,
            text="Testowy komentarz",
            like_count=0,
            dislike_count=0,
            imgur_user=user,
            post=post,
        )

    def test_create_comment(self):
        Comment.objects.all().delete()
        test_user = ImgurUser.objects.create(
            email="testlogin3@gmail.com", password=make_password("Testpassword3")
        )
        test_post = Post.objects.create(
            title="Avatar steam",
            description="Kozacki avatar na steam",
            tag="Avatary",
            expirationDate="2023-05-27T21:22:25.429235Z",
            like_count=0,
            dislike_count=0,
        )

        data = {
            "text": "Nowy komentarzz",
            "like_count": 0,
            "dislike_count": 0,
            "imgur_user": test_user.id,
            "post": test_post.id,
        }

        response = self.client.post(
            reverse("comments"), data, content_type="application/json"
        )

        if response.status_code == 422:
            print("Validation errors:")
            print(response.data.get("errors"))
        self.assertEqual(response.status_code, 201)
        return response

    def test_create_comment_unprocessable_entity(self):
        data = {
            "text": "Testowy komentarz",
            "like_count": 0,
            "dislike_count": 0,
            "imgur_user": 1,
            "post": 3,
        }
        response = self.client.post(
            reverse("comments"), data, content_type="application/json"
        )
        self.assertEqual(response.status_code, 422)

    # GET
    def test_get_comments(self):
        response = self.client.get(reverse("comments"))
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)

        for comment_data, comment in zip(data, Comment.objects.all()):
            self.assertEqual(comment_data["id"], comment.id)
            self.assertEqual(comment_data["text"], comment.text)
            self.assertEqual(comment_data["like_count"], comment.like_count)
            self.assertEqual(comment_data["dislike_count"], comment.dislike_count)
            self.assertEqual(comment_data["imgur_user"], comment.imgur_user.id)
            self.assertEqual(comment_data["post"], comment.post.id)

    def test_get_comments_not_found(self):
        bad_comment_id = 9999
        response = self.client.get(reverse("comment", args=[bad_comment_id]))
        self.assertEqual(response.status_code, 404)

    # CommentDetail
    def test_get_comment_detail(self):
        comment_id = 1
        response = self.client.get(reverse("comment", args=[comment_id]))
        self.assertEqual(response.status_code, 200)

    def test_get_comment_detail_not_found(self):
        nonexistent_comment_id = 9999
        response = self.client.get(reverse("comment", args=[nonexistent_comment_id]))
        self.assertEqual(response.status_code, 404)

    def test_update_comment_detail(self):
        comment_id = 1
        test_user = ImgurUser.objects.create(
            email="testlogin2@gmail.com", password=make_password("Testpassword2")
        )
        test_post = Post.objects.create(
            title="Avatar steam",
            description="Kozacki avatar na steam",
            tag="Avatary",
            expirationDate="2023-05-27T21:22:25.429235Z",
            like_count=0,
            dislike_count=0,
        )
        updated_data = {
            "text": "Zaktualizowany komentarz",
            "imgur_user": test_user.id,
            "post": test_post.id,
        }
        response = self.client.put(
            reverse("comment", args=[comment_id]),
            data=updated_data,
            content_type="application/json",
        )
        if response.status_code == 400:
            print("Validation errors:")
            print(response.data.get("errors"))
        self.assertEqual(response.status_code, 200)

    def test_update_comment_detail_bad_request(self):
        comment_id = 1
        updated_data = {
            "text": "Nowy komentarz",
        }
        response = self.client.put(
            reverse("comment", args=[comment_id]),
            data=updated_data,
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)

    def test_update_comment_detail_not_found(self):
        comment_id = 9999
        updated_data = {
            "text": "Nowy komentarz",
        }
        response = self.client.put(
            reverse("comment", args=[comment_id]),
            data=updated_data,
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)

    def test_delete_comment_detail(self):
        comment_id = 1
        response = self.client.delete(reverse("comment", args=[comment_id]))
        self.assertEqual(response.status_code, 204)

    def test_delete_comment_detail_not_found(self):
        comment_id = 9999
        response = self.client.delete(reverse("comment", args=[comment_id]))
        self.assertEqual(response.status_code, 404)


# Sygnały
class EmailConfirmedTestCase(TestCase):
    def test_email_confirmed_(self):
        email = "test@example.com"
        user = ImgurUser.objects.create(email=email)
        email_address = EmailAddress.objects.create(
            email=email, user=user, primary=True, verified=True
        )

        email_confirmed.send(
            sender=self.__class__, request=None, email_address=email_address
        )
        user.refresh_from_db()
        self.assertTrue(user.is_active)
