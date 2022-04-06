from django.db import models
from django.contrib.auth.models import User



def user_avatar(instance, filename):
    return f'profile_avatar/{instance.user.id}_avatar.jpg'



class Profile(models.Model):
    user        = models.ForeignKey(User, on_delete=models.CASCADE) #which user realted to this profile
    first_name  = models.CharField(max_length=50, blank=True)
    last_name   = models.CharField(max_length=80, blank=True)
    avatar      = models.ImageField(upload_to=user_avatar)
    biograhpy   = models.CharField(max_length=200, blank=True)

