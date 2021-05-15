from rest_framework import routers

from ..views.api import LandlordViewset, ReviewViewSet

router = routers.SimpleRouter()

router.register(r"reviews", ReviewViewSet)
router.register(r"landlords", LandlordViewset)

urlpatterns = router.urls
