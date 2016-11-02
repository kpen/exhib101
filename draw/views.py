from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
import os, sys

def nopictnumber(request):
    template = loader.get_template('draw/index.html')
    context = {
        'latest_question_list': '232323',
    }
    return HttpResponse(template.render(context, request))
	
def pictnumber(request, picture_id):
    i23=0
    while os.path.isfile(str(picture_id)+"/eee"+str(i23)+".txt"):
     i23=i23+1

    str23 = " var acryl = "+picture_id+"; var entering =" + str(i23)
    template = loader.get_template('draw/index.html')
    context = {
       # 'pictureid': picture_id,
		'jsstring': str23,
    }
    return HttpResponse(template.render(context, request))
