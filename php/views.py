from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.http import QueryDict

import os, sys

def firstwritephp(request):
  if request.POST.__contains__("prma"):
   acryl = int(request.POST['prma'])
  else :
   acryl = 0
  if request.POST.__contains__("prm0"):
   ent = int(request.POST['prm0'])
  else :
   ent = 0
  if request.POST.__contains__("prm1"):
   mystring = request.POST['prm1']
   b = mystring.encode('utf-8')

   fd = os.open(str(acryl)+"/eee"+str(ent)+"_tmp.txt",os.O_RDWR|os.O_CREAT|os.O_TRUNC)
   ret = os.write(fd,b)
   os.close(fd)
  return HttpResponse("{\"param1\":\"111\",\"param2\":\"2222\",\"param3\":\"333\"}")

def nextwritephp(request):
  if request.POST.__contains__("prma"):
   acryl = int(request.POST['prma'])
  else :
   acryl = 0
  if request.POST.__contains__("prm0"):
   ent = int(request.POST['prm0'])
  else :
   ent = 0
  if request.POST.__contains__("prm1"):
   mystring = request.POST['prm1']
   b = mystring.encode('utf-8')

   fd = os.open(str(acryl)+"/eee"+str(ent)+"_tmp.txt",os.O_WRONLY|os.O_APPEND)
   ret = os.write(fd,b)
   os.close(fd)

  return HttpResponse("{\"param1\":\"111\",\"param2\":\"2222\",\"param3\":\"333\"}")

def lastwritephp(request):
  if request.POST.__contains__("prma"):
   acryl = int(request.POST['prma'])
  else :
   acryl = 0
  if request.POST.__contains__("prm0"):
   ent = int(request.POST['prm0'])
  else :
   ent = 0
  if os.path.isfile(str(acryl)+"/eee"+str(ent)+".txt"):
   os.remove(str(acryl)+"/eee"+str(ent)+".txt")
  if os.path.isfile(str(acryl)+"/eee"+str(ent)+"_tmp.txt"):
   os.rename(str(acryl)+"/eee"+str(ent)+"_tmp.txt",str(acryl)+"/eee"+str(ent)+".txt")
  return HttpResponse("{\"param1\":\"111\",\"param2\":\"2222\",\"param3\":\"333\"}")

def nextimage(request):
    pictures = load_all_pictures
    # [Picture, Picture, Picture]
    pictures.pop()
    # LIFO algorithm

def readphp(request):
 if request.POST.__contains__("prm0"):
  t22 = int(request.POST['prm0'])
 else :
  t22 = 0
 if request.POST.__contains__("prm1"):
  t23 = int(request.POST['prm1'])
 else :
  t23 = 0
 if os.path.isfile(str(t22)+"/eee"+str(t23)+".txt"):
   needreset = 0
 else:
   needreset = 1
   t23 = 0
 fd = os.open(str(t22)+"/eee"+str(t23)+".txt",os.O_RDWR)
 ret = os.read(fd,1000000)
 os.close(fd)
 pictname = "/static/common/imgs/img2379.JPG"
 txt23="{\"param1\":\""+ret.decode('utf-8')+"\",\"param2\":\""+str(needreset)+"\"}"
 return HttpResponse(txt23)
