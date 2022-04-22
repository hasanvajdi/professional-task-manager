from rest_framework.viewsets import ModelViewSet
from . models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status




class ProfileViewset(ModelViewSet):
    queryset            = Profile.objects.all()
    serializer_class    = ProfileSerializer



class GroupViewset(ModelViewSet):
    queryset             = Group.objects.all()
    serializer_class     = GroupSerializer


    def list(self, request):
        #print("user : ", request.__dict__)
        group_list = Group.objects.filter(owner = request.user.id)
        #print("user2 : ", request.cookies)
        serializer = GroupSerializer(group_list, many=True)
        return Response(serializer.data)
        




class TaskVeiwset(ModelViewSet):
    queryset            = Task.objects.all()
    serializer_class    = TaskSerializer


   

