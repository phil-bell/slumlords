from django.urls import path
from django.urls.conf import include
from slumlords.review.views.client import (
    ReviewCreateView,
    ReviewListView,
    ReviewRetrieve,
)

app_name = "review"

urlpatterns = [
    path("api/", include("slumlords.review.urls.api")),
    path("", ReviewListView.as_view(), name="list"),
    path("create/", ReviewCreateView.as_view(), name="create"),
    path("<pk>/", ReviewRetrieve.as_view(), name="retreive"),
]
