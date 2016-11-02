from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /view/
    url(r'^$', views.showdrawing, name='nopictnumber'),
]

