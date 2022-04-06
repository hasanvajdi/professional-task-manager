from rest_framework.viewsets import ModelViewSet
from . models import Profile
from .serializers import ProfileSerializer

class ProfileViewset(ModelViewSet):
    queryset            = Profile.objects.all()
    serializer_class    = ProfileSerializer