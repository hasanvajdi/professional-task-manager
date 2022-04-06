from rest_framework import routers

from . views import ProfileViewset

router = routers.SimpleRouter()

router.register("profile", ProfileViewset)

urlpatterns = router.urls
