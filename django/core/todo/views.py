from rest_framework.viewsets import ModelViewSet
from . models import Profile

class ProfileViewset(ModelViewSet):
    queryset            = Profile.objects.all()
    serializer_class    = ProfileSerializer