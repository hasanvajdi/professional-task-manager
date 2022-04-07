from rest_framework.serializers import ModelSerializer
from . models import *

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"