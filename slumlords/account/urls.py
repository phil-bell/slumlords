from django.urls import path
from django.contrib.auth.views import LogoutView

from slumlords.account.views import Login, Create

app_name = "account"

urlpatterns = [
    path("login/", Login.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("create/", Create.as_view(), name="create"),
]
