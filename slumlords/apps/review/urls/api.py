from rest_framework import routers

from ..views.api import ReviewViewSet

router = routers.SimpleRouter()

router.register(r"reviews", ReviewViewSet)

urlpatterns = router.urls
