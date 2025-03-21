from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from .models import UserData
from .serializers import GetDataSerializer, SaveDataSerializer

import re

# from spacy_implementation import *
import spacy
from spacy import displacy

# supported spacy models have to be downloaded with the following command
# python -m spacy download <model_name>
spacy_models = ["de_core_news_sm", "en_core_web_sm"] 

def index(request):
    res = {
        "hello": "world"
    }
    return JsonResponse(res)


def analyze_with_spacy(text, model_id = 0):
    nlp = spacy.load(spacy_models[model_id])
    doc1 = nlp(text)
    html_string = displacy.render(doc1, style="ent", page=False)
    return html_string

@csrf_exempt
def loginUser(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Extract username, password, and any other data from the request
        email = data.get('email')
        password = data.get('password')
    
        # Perform user registration logic here
        user = authenticate(username=email, password=password)
        if user is not None:
            login(request, user)
            response_string = f"User with email {email} logged in successfully"
            return JsonResponse({'message': response_string}, status=200)
        else:
            response_string = f"User with email {email}: wrong credentials"
            return JsonResponse({'message': response_string}, status=400)
        
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
@csrf_exempt
def registerUser(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Extract username, password, and any other data from the request
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        surname = data.get('surname')
       

        password_regex = re.compile(r'^[a-zA-Z0-9!@#$%^&*]{6,16}$')
        if not password_regex.match(password):
            return JsonResponse(
                {'message': 'Password must be 6-16 characters long and contain at least 2 digits.'}, 
                status=400
            )
        
        # Perform user registration logic here
        if User.objects.filter(username=email).exists():
            response_string = f"User with email {email} already exists"
            return JsonResponse({'message': response_string}, status=400)
        else:
            user = User.objects.create_user(username=email, password=password, first_name=name, last_name=surname)
            response_string = f"User with email {email} created successfully"
            return JsonResponse({'message': response_string}, status=201)

    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
@csrf_exempt
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True, 'username': request.user.username, 'first_name': request.user.first_name, 'last_name': request.user.last_name})

@csrf_exempt
def logoutUser(request):
    if request.user.is_authenticated:
        logout(request)
        return JsonResponse({'message': 'User logged out successfully'}, status=200)
    else:
        return JsonResponse({'error': 'User is not logged in'}, status=400)

#########################################################

@csrf_exempt
def add_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        serializer = SaveDataSerializer(data=data)
        if serializer.is_valid():
            
            # TODO: run spacy model here and save the generated text in the db
            html_string = analyze_with_spacy(data.get('text'),int(data.get('model_id')))
            user_data = serializer.save(user=request.user, analyzed_text=html_string)

            return JsonResponse({'id': user_data.id}, status=201)
        return JsonResponse(serializer.errors, status=400)

    return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

@csrf_exempt
def get_user_data_all(request):
    if request.method == 'GET':
        user_data = UserData.objects.filter(user=request.user).order_by('-updated_at')
        serializer = GetDataSerializer(user_data, many=True)
        return JsonResponse(serializer.data, safe=False, content_type="application/json")
    else:
        return JsonResponse({'error': 'Only GET method is allowed'}, status=405)

@csrf_exempt
def get_user_data_public(request):
    if request.method == 'GET':
        user_data = UserData.objects.filter(user=request.user, is_public=True).order_by('-updated_at')
        serializer = GetDataSerializer(user_data, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({'error': 'Only GET method is allowed'}, status=405)

@csrf_exempt
def get_user_data_private(request):
    if request.method == 'GET':
        user_data = UserData.objects.filter(user=request.user, is_public=False).order_by('-updated_at')
        serializer = GetDataSerializer(user_data, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({'error': 'Only GET method is allowed'}, status=405)

@csrf_exempt
def get_user_data_by_id(request, id):
    if request.method == 'GET':
        try:
            user_data = UserData.objects.get(id=id, user=request.user)
            serializer = GetDataSerializer(user_data)
            return JsonResponse(serializer.data, safe=False, content_type="application/json")
        except UserData.DoesNotExist:
            return JsonResponse({'error': 'Data not found'}, status=404)
    else:
        return JsonResponse({'error': 'Only GET method is allowed'}, status=405)

@csrf_exempt
def get_public_data_all(request):
    if request.method == 'GET':
        public_data = UserData.objects.filter(is_public=True).order_by('-updated_at')
        serializer = GetDataSerializer(public_data, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({'error': 'Only GET method is allowed'}, status=405)

@csrf_exempt
def delete_data(request, pk):
    if request.method == 'DELETE':
        item = UserData.objects.get(id=pk)
        item.delete()
        return JsonResponse({'message': 'Text was deleted successfully!'}, status=200)
    else:
        return JsonResponse({'error': 'Only DELETE method is allowed'}, status=405)

@csrf_exempt
def update_data_by_id(request, id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        text = data.get("text")

        item = UserData.objects.get(id=id)
        item.text = text
        item.analyzed_text = analyze_with_spacy(text) # analyze text with spacy
        
        item.save()

        return JsonResponse({'id': id}, status=201)
    else:
        return JsonResponse({'error': 'Only PUT method is allowed'}, status=405)
