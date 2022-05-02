from django.db import models
from django.contrib.auth.models import User
import random, string, uuid
from django_jalali.db import models as jmodels




def user_avatar(instance, filename):
    return f'profile_avatar/{instance.user.id}_avatar.jpg'

class Profile(models.Model):
    user        = models.OneToOneField(User, on_delete=models.CASCADE) #which user realted to this profile
    first_name  = models.CharField(max_length=50, blank=True)
    last_name   = models.CharField(max_length=80, blank=True)
    avatar      = models.ImageField(upload_to=user_avatar, blank=True)
    biograhpy   = models.CharField(max_length=200, blank=True)


    def __str__(self):
        return self.user.username






def group_id_creator():
    return "-" + str(''.join(random.sample("0123456789", 10)))

def group_link_creator():
    return ''.join(random.sample("0123456789" + string.ascii_lowercase + string.ascii_uppercase, 19))


class Group(models.Model):
    group_id        = models.CharField(max_length=20, blank=True, unique=True, editable=False, primary_key=True, default=group_id_creator)
    link            = models.CharField(max_length=30, blank=True, unique=True, editable=False, default=group_link_creator)
    name            = models.CharField(max_length=50)
    owner           = models.ForeignKey(User, on_delete=models.CASCADE)
    members         = models.ManyToManyField(User, related_name="group_members")
    created_date    = jmodels.jDateTimeField(blank=True, auto_now_add=True)


    def __str__(self):
        return self.name




class Task(models.Model):
    STATUS_CHOICE  = [
        ("C", "Created"),
        ("D", "Doing"),
        ("F", "Finished")
    ]

    uuid            = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    title           = models.CharField(max_length=100)
    description     = models.TextField()
    status          = models.CharField(max_length=1, default="C", choices=STATUS_CHOICE)
    group           = models.ManyToManyField(Group)
    created_date    = models.DateTimeField(auto_now_add=True)
    finished_date   = models.DateTimeField(null=True)
    duration        = models.CharField(max_length=200, blank=True)


    def __str__(self):
        return self.title
