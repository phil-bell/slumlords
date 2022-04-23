from django.urls import path
from apps.map.views import MapView

app_name = "map"

urlpatterns = [
    path("view/", MapView.as_view(), name="view"),
]
