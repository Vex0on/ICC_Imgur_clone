from rest_framework.decorators import api_view
from .serializers import *
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def getImgurUsers(request):
    users = ImgurUser.objects.all()
    serializer = ImgurUserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def register_user(request):
    serializer = ImgurUserSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        username = email
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
        )
        ImgurUser.objects.create(
            user=user,
            username=username,
            email=email,
            password=password
        )
        return Response(
            {'message': 'User created successfully'},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getImgurUser(request, pk):
    user = ImgurUser.objects.get(id=pk)
    serializer = ImgurUserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getPosts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST', 'DELETE'])
def getPost(request, pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getImages(request):
    images = Image.objects.all()
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST', 'DELETE'])
def getImage(request, pk):
    image = Image.objects.get(id=pk)
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getLikes(request):
    likes = Like.objects.all()
    serializer = LikeSerializer(likes, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST', 'DELETE'])
def getLike(request, pk):
    like = Like.objects.get(id=pk)
    serializer = LikeSerializer(like, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getComments(request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST', 'DELETE'])
def getComment(request, pk):
    comment = Comment.objects.get(id=pk)
    serializer = CommentSerializer(comment, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getSubcomments(request):
    subcomments = Subcomment.objects.all()
    serializer = SubcommentSerializer(subcomments, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST', 'DELETE'])
def getSubcomment(request, pk):
    subcomment = Subcomment.objects.get(id=pk)
    serializer = SubcommentSerializer(subcomment, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getReactions(request):
    reactions = Reaction.objects.all()
    serializer = ReactionSerializers(reactions, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST', 'DELETE'])
def getReaction(request, pk):
    reaction = Reaction.objects.get(id=pk)
    serializer = ReactionSerializers(reaction, many=False)
    return Response(serializer.data)
