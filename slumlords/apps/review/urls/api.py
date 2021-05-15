from rest_framework import routers

from ..views.api import LandlordViewSet, PropertyViewSet, ReviewViewSet

router = routers.SimpleRouter()

router.register(r"reviews", ReviewViewSet)
router.register(r"landlords", LandlordViewSet)
router.register(r"properties", PropertyViewSet)

urlpatterns = router.urls
