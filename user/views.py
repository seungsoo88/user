#backend/post/views.py
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserSerializer, UserListSerializer
from rest_framework.response import Response
import sys
import uuid



#list
class UserListUser(generics.ListCreateAPIView):
    def get(self, request): 
        if request.GET['datatype'] == 'db' :
            queryset = User.objects.all();
            serializers_class = UserListSerializer(queryset, many = True);
            return Response(serializers_class.data);
            
            # queryset = User.objects.values().order_by('id');
            # user_list = list();
            # for select in queryset : 
            #     user = {
            #     "id" : select['id'],
            #     "name" : select['name'],
            #     }
            #     user_list.append(user);
            # return Response(user_list)
        elif request.GET['datatype'] == 'txt' : 
            user_list=list();
            with open("frontend/public/media/txt/user_info.txt", 'r') as file : 
                user_txt = file.readlines()
                for user in user_txt : 
                    user = user.split(',')
                    users = {
                        'id' : user[0],
                        'name' : user[1]
                    }
                    user_list.append(users);
            return Response(user_list)
        
        
#create
class CreateUser(generics.ListCreateAPIView):
    def post(self, request):
        uu = uuid.uuid4()
        name = request.data['name']
        age = request.data['age']
        poto = "/images/"+str(uu.int)+"_"+request.data['poto'].name
        request.data['poto'].name = poto
        Serializer = UserSerializer(data = request.data)
        if Serializer.is_valid() : 
            Serializer.save()
            queryset = User.objects.values()
            for last_user in queryset : 
                id = last_user['id']
            
            sys.stdout = open("frontend/public/media/txt/user_info.txt", 'a')
            for i in range(1):
                print("{},{},{},{}".format(id,name,age,poto))
                sys.stdout.close()
            return Response(Serializer.data)
        return Response(Serializer.errors)
        
        
#detail
class DetailUser(generics.RetrieveUpdateDestroyAPIView):
    def get(self,request, pk) : 
        print("=========================")
        print(request.GET)
        if request.GET['dataType'] == 'db' : 
            print(pk)
            queryset = User.objects.filter(id = pk)
            serializer_class = UserSerializer(queryset, many = True)
            user_info = list(serializer_class.data[0].values())
            id = user_info[0]
            name = user_info[1]
            age = user_info[2]
            poto = user_info[3]
            user = {
                "id" : id,
                "name" : name,
                "age" : age,
                "poto" : poto
            }
            return Response(user)
        elif request.GET['dataType'] == 'txt' : 
            print(request.GET['dataType'])
            with open("frontend/public/media/txt/user_info.txt", 'r') as file : 
                print(pk)
                user_txt = file.readlines()
                for users in user_txt : 
                    users = users.split(',')
                    if int(users[0]) == pk : 
                        name = users[1]
                        age = users[2]
                        poto = '/media/'+users[3].replace("\n","")
                        user = {
                            "name" : name,
                            "age" : age,
                            "poto" : poto
                        }
                        
                print(user);
                return Response(user)

    



