from rest_framework.serializers import ModelSerializer, SerializerMethodField
from . models import *
from django.contrib.auth.models import User




class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class ProfileSerializer(ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = "__all__"



class GroupCreateSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"

 




class GroupListSerializer(ModelSerializer):
    owner = UserSerializer()
    created_date = SerializerMethodField()

    class Meta:
        model = Group
        fields = "__all__"
    

    def get_created_date(self, obj):
        return {
            "date" : obj.created_date.strftime("%Y/%m/%d"),
            "time" : obj.created_date.strftime("%H:%M")
        }





class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"