from rest_framework.serializers import ModelSerializer
from . models import *
from django.contrib.auth.models import User



class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class ProfileSerializer(ModelSerializer):
    user = UserSerializer()
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