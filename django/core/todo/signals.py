from django.db.models.signals import post_save
from django.contrib.auth.models import User
from . models import Profile
from django.dispatch import receiver




#singal for create proifle
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    print("yessss in signal")
    if created:
        print("instance :", instance.__dict__)
        print("new : ", User.objects.filter(pk=instance.pk).__dict__)
        Profile.objects.create(user=instance)

#{'_state': <django.db.models.base.ModelState object at 0x0000027A5BACEE80>, 'id': 2, 'password': 'pbkdf2', 'last_login': None, 'is_superuser': False, 'username': 'hoshang', 'first_name': '', 'last_name': '', 'email': '', 'is_staff': False, 'is_active': True, 'date_joined': datetime.datetime(2022, 4, 9, 9, 0, 28, 873826, tzinfo=<UTC>), '_password': 'Hasan99609970'}