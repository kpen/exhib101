from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^read101.php', views.readphp, name='index'),
#	url(r'^changeTarget.php', views.changeTargetphp, name='index'),
	url(r'^firstwrite101.php', views.firstwritephp, name='index'),
	url(r'^nextwrite101.php', views.nextwritephp, name='index'),
	url(r'^lastwrite101.php', views.lastwritephp, name='index'),
#    url(r'^$', views.index, name='index'),
]

