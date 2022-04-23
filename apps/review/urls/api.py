from rest_framework import routers

from ..views.api import (
    LandlordViewSet,
    PhotoViewSet,
    PointViewSet,
    PropertyViewSet,
    ReviewViewSet,
)

router = routers.SimpleRouter()

router.register(r"reviews", ReviewViewSet)
router.register(r"landlords", LandlordViewSet)
router.register(r"properties", PropertyViewSet)
router.register(r"photos", PhotoViewSet)
router.register(r"points", PointViewSet)

urlpatterns = router.urls
