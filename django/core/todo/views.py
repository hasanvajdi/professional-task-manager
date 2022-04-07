from rest_framework.viewsets import ModelViewSet
from . models import *
from .serializers import *

class ProfileViewset(ModelViewSet):
    queryset            = Profile.objects.all()
    serializer_class    = ProfileSerializer


class GroupViewset(ModelViewSet):
    queryset             = Group.objects.all()
    serializer_class     = GroupSerializer


class TaskVeiwset(ModelViewSet):
    queryset            = Task.objects.all()
    serializer_class    = TaskSerializer