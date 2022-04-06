from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings
from . views import ProfileViewset



router = routers.SimpleRouter()

router.register("profile", ProfileViewset)

urlpatterns = router.urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)