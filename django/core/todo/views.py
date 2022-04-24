from rest_framework.viewsets import ModelViewSet
from . models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status




class ProfileViewset(ModelViewSet):
    queryset            = Profile.objects.all()
    serializer_class    = ProfileSerializer


    def list(self, request):
        members_list = [] # the members list keeper
        group_list = Group.objects.filter(owner = request.user.id) # get all groups

        for group in group_list: # explore in the group list
            for member in group.members.all(): # get the each gorup members
                if member not in members_list: # check the user already exist is list or not
                    members_list.append(member.id) #  append user.id profile to members list
        
        profile_list = Profile.objects.filter(user__in=members_list)
        serializer = ProfileSerializer(profile_list, many=True)
        return Response(serializer.data)



class GroupViewset(ModelViewSet):
    queryset             = Group.objects.all()
    serializer_class     = GroupSerializer

    

    def list(self, request):            
        group_list = Group.objects.filter(owner = request.user.id)
        serializer = GroupSerializer(group_list, many=True)
        return Response(serializer.data)
        




class TaskVeiwset(ModelViewSet):
    queryset            = Task.objects.all()
    serializer_class    = TaskSerializer


   

