from django.urls import path
from django.urls.conf import include
from slumlords.apps.review.views.client import (
    ReviewCreateView,
    ReviewListView,
    ReviewView,
)

app_name = "review"

urlpatterns = [
    path("api/", include("slumlords.apps.review.urls.api")),
    path("create/", ReviewCreateView.as_view(), name="create"),
    path("list/", ReviewListView.as_view(), name="list"),
    path("view/<pk>", ReviewView.as_view(), name="view"),
]
