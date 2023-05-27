from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import Reaction, Post, Comment, Subcomment
from ..serializers import ReactionSerializers


class ReactionList(APIView):
    def get(self, request):
        try:
            reactions = Reaction.objects.all()
            serializer = ReactionSerializers(reactions, many=True)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        except Reaction.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def post(self, request):
        record_id = request.data.get("record_id")
        individual_id = request.data.get("individual_id")
        imgur_user_id = request.data.get("imgur_user")

        try:
            existing_reaction = Reaction.objects.get(record_id=record_id, individual_id=individual_id,
                                                     imgur_user=imgur_user_id)
            serializer = ReactionSerializers(existing_reaction)
            return Response(
                {"message": "HTTP_409_CONFLICT", "existing_reaction": serializer.data},
                status=status.HTTP_409_CONFLICT,
            )
        except Reaction.DoesNotExist:
            serializer = ReactionSerializers(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"message": "HTTP_201_CREATED"},
                    status=status.HTTP_201_CREATED,
                )
            else:
                return Response(
                    {"message": "HTTP_400_BAD_REQUEST"},
                    status=status.HTTP_400_BAD_REQUEST,
                )


class ReactionDetail(APIView):
    def get(self, request, record_id, individual_id, imgur_user_id):
        try:
            reaction = Reaction.objects.get(record_id=record_id, individual_id=individual_id, imgur_user=imgur_user_id)
            serializer = ReactionSerializers(reaction, many=False)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        except Reaction.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def put(self, request, record_id, individual_id, imgur_user_id):
        try:
            changed_reaction = request.data.get("reaction")
            if changed_reaction is None:
                return Response(
                    {"message": "Reaction is required."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            reaction = Reaction.objects.get(record_id=record_id, individual_id=individual_id, imgur_user=imgur_user_id)
            reaction.reaction = changed_reaction
            serializer = ReactionSerializers(reaction, many=False, data={"id": reaction.id, "record_id": reaction.record_id,
                                                                         "individual_id": reaction.individual_id,
                                                                         "imgur_user": reaction.imgur_user.pk,
                                                                         "reaction": changed_reaction})
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"message": "HTTP_200_OK"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"errors": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Reaction.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def delete(self, request, record_id, individual_id, imgur_user_id):
        try:
            reactions = Reaction.objects.filter(record_id=record_id, individual_id=individual_id,
                                                imgur_user=imgur_user_id)

            if reactions.exists():
                reactions.delete()
                return Response(
                    {"message": "HTTP_204_NO_CONTENT"},
                    status=status.HTTP_204_NO_CONTENT,
                )
            else:
                return Response(
                    {"message": "HTTP_404_NOT_FOUND"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        except Reaction.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND,
            )


class UserReactions(APIView):
    def get(self, request, individual_id, imgur_user_id):
        post_exists = Post.objects.filter(pk=individual_id).exists()
        if post_exists:
            reactions_comment = Reaction.objects.filter(record_id=1, imgur_user=imgur_user_id).values_list("id", "reaction")
            reactions_comment = [{"id": id, "reaction": reaction} for id, reaction in reactions_comment]

            reactions_subcomment = Reaction.objects.filter(record_id=2, imgur_user=imgur_user_id).values_list("id", "reaction")
            reactions_subcomment = [{"id": id, "reaction": reaction} for id, reaction in reactions_subcomment]

            return Response({"data": {
                "reactions_comment": reactions_comment,
                "reactions_subcomment": reactions_subcomment
            }}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND)


class CountReactionsPost(APIView):
    def get(self, request, individual_id):
        post_exists = Post.objects.filter(pk=individual_id).exists()
        if post_exists:
            like_data = Reaction.objects.filter(record_id=0, individual_id=individual_id, reaction=True).count()
            dislike_data = Reaction.objects.filter(record_id=0, individual_id=individual_id,
                                                   reaction=False).count()
            count = like_data - dislike_data
            return Response({"count": count}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND
            )


class CountReactionsComment(APIView):
    def get(self, request, individual_id):
        comments_exists = Comment.objects.filter(post=individual_id).exists()
        if not comments_exists:
            return Response({"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND)

        comments = Comment.objects.filter(post=individual_id)
        results = []

        for comment in comments:
            like_data = Reaction.objects.filter(record_id=1, individual_id=comment.id,
                                                reaction=True).count()
            dislike_data = Reaction.objects.filter(record_id=1, individual_id=comment.id,
                                                   reaction=False).count()
            count = like_data - dislike_data
            results.append({"comment_id": comment.id, "count": count})

        return Response({"data": results})


class CountReactionsCommentSubcomment(APIView):
    def get(self, request, individual_id):
        comments_exists = Comment.objects.filter(post=individual_id).exists()
        if not comments_exists:
            return Response({"message": "HTTP_404_NOT_FOUND"}, status=status.HTTP_404_NOT_FOUND)

        comments = Comment.objects.filter(post=individual_id)
        results = []

        for comment in comments:
            like_data = Reaction.objects.filter(record_id=1, individual_id=comment.id, reaction=True).count()
            dislike_data = Reaction.objects.filter(record_id=1, individual_id=comment.id, reaction=False).count()
            count = like_data - dislike_data
            subcomments = Subcomment.objects.filter(comment=comment.id)
            subresults = []

            for subcomment in subcomments:
                sublike_data = Reaction.objects.filter(record_id=2, individual_id=subcomment.id, reaction=True).count()
                subdislike_data = Reaction.objects.filter(record_id=2, individual_id=subcomment.id, reaction=False).count()
                subcount = sublike_data - subdislike_data
                subresults.append({"subcomment_id": subcomment.id, "count": subcount})

            results.append({"comment_id": comment.id, "count": count, "subcomments": subresults})

        return Response({"data": results})


class UserReaction(APIView):
    def get(self, request, record_id, individual_id, imgur_user_id):
        try:
            reaction = Reaction.objects.get(record_id=record_id, individual_id=individual_id, imgur_user=imgur_user_id)
            return Response({"reaction": reaction.reaction})
        except Reaction.DoesNotExist:
            return Response(
                {"message": "HTTP_404_NOT_FOUND"},
                status=status.HTTP_404_NOT_FOUND
            )
