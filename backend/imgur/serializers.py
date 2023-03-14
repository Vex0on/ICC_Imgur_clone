from rest_framework import serializers
from .models import *


class ImgurUserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        del validated_data['confirmPassword']
        return super().create(validated_data)

    class Meta:
        model = ImgurUser
        fields = ('id', 'username', 'email', 'password', 'phone_number')
        extra_kwargs = {
            'password': {'write_only': True},
        }


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'description', 'tag', 'expirationDate')


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'name', 'size', 'mimeType', 'path')


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'like_count', 'dislike_count')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'text')


class SubcommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcomment
        fields = ('id', 'text')


class ReactionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = ('id', 'reaction', 'record_id')
