from django.db import models
from django.contrib.auth.models import User
import random
import string


def user_avatar(instance, filename):
    return f'profile_avatar/{instance.user.id}_avatar.jpg'



class Profile(models.Model):
    user        = models.OneToOneField(User, on_delete=models.CASCADE) #which user realted to this profile
    first_name  = models.CharField(max_length=50, blank=True)
    last_name   = models.CharField(max_length=80, blank=True)
    avatar      = models.ImageField(upload_to=user_avatar)
    biograhpy   = models.CharField(max_length=200, blank=True)





def group_id_creator():
    return "-" + str(''.join(random.sample("0123456789", 10)))

def group_link_creator():
    return ''.join(random.sample("0123456789" + string.ascii_lowercase + string.ascii_uppercase, 19))


class Group(models.Model):
    group_id    = models.CharField(max_length=10, blank=True, unique=True, editable=False, primary_key=True, default=group_id_creator)
    link        = models.CharField(max_length=19, blank=True, unique=True, editable=False, default=group_link_creator)
    name        = models.CharField(max_length=50)
    owner       = models.ForeignKey(User, on_delete=models.CASCADE)
    members     = models.ManyToManyField(User, related_name="group_members")
