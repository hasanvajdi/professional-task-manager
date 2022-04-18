from rest_framework.viewsets import ModelViewSet
from . models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
import requests

from rest_framework_simplejwt.views import TokenVerifyView

from dj_rest_auth.jwt_auth import get_refresh_view


def user_authentication(tokens):

    verify_acces = requests.post(
                    "http://localhost:8000/dj-rest-auth/token/verify/", 
                    {"token":tokens["access_token"]}
                )

    print("verify_acces", requests.Response())


class ProfileViewset(ModelViewSet):
    queryset            = Profile.objects.all()
    serializer_class    = ProfileSerializer


class GroupViewset(ModelViewSet):
    queryset             = Group.objects.all()
    serializer_class     = GroupSerializer

    def list(self, request):
        cookies = request.COOKIES

        if cookies:
            user_authentication(cookies)

        #req = request.post()
        try:
            group_list = Group.objects.filter(owner = request.user.id)
            print("group list : ", group_list)


            serializer = GroupSerializer(group_list, many=True)
            return Response(serializer.data)
        except:
            print("error")
    
        return Response("yes")




class TaskVeiwset(ModelViewSet):
    queryset            = Task.objects.all()
    serializer_class    = TaskSerializer


    #def create(self, request):
    #    super().create(request)
    #    return Response(status=status.HTTP_201_CREATED)
    
    #def partial_update(self, request, pk=None):
    #    print("in partial", request.data)
#
    #    super().partial_update(request)
    #    return Response(status=status.HTTP_200_OK)

#
    #def update(self, request, pk=None):
    #    print("in update", dict(request.data))
    #    if dict(request.data)["finished_date"][0] != '':
    #        print("yesssssss")
#
    #    super().update(request)
    #    return Response(status=status.HTTP_200_OK)
