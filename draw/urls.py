from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /draw/
    url(r'^$', views.nopictnumber, name='nopictnumber'),
    # ex: /draw/5/
    url(r'^(?P<picture_id>[0-9]+)/$', views.pictnumber, name='pictnumber'),
]

