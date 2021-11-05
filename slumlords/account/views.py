from slumlords.review.models import Tenant
from django.contrib.auth.views import LoginView
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import login

from django.views.generic.edit import CreateView

# Create your views here.
class Login(LoginView):
    template_name = "account/login.html"
    redirect_authenticated_user = True


class Create(CreateView):
    model = User
    fields = ["username", "password"]
    template_name = "account/create.html"

    def get_success_url(self):
        Tenant.objects.create(user=self.object)
        login(self.request, self.object)
        return reverse("home")
