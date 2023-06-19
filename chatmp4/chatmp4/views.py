from django.http import HttpResponse ,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from home.models import User

def test(request) : 
    return HttpResponse("hello world")

@csrf_exempt
def login(request) : 
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        id = data.get('id')
        name = data.get('name')
        pwd = data.get('pwd')
        print(id, pwd)

        try:
            user = User.objects.get(email=id)
            if user.password == pwd:
                return HttpResponse("Login successful!")
            else:
                return HttpResponse("Invalid credentials!")
        except User.DoesNotExist:
            return HttpResponse("User does not exist!")

# 파일 업로드
@csrf_exempt
def videoUpload(request):
    if request.method == 'POST':
        title = request.POST['video']
        uploadFile = request.FILES['file']
        print(uploadFile)
        # id = request.POST['userId']
        # video_title = request.POST['videoTitle']
        # video_address = request.POST['videoAddress']
        # upload_date = request.POST['uploadDate']

        try: # db저장
            user = User.objects.get(id=user_id)
            video = Video(
                id=user,
                video_title=video_title,
                video_addr=video_address,
                upload_date=upload_date
            )
            video.save()
            return JsonResponse({'message': 'File uploaded successfully.'})
        except User.DoesNotExist:
            return JsonResponse({'message': 'User does not exist.'})
        except Exception as e:
            return JsonResponse({'message': 'Error occurred while uploading file.'})

    else:
        return JsonResponse({'message': 'File upload failed.'})


# 회원가입
@csrf_exempt          
def signup(request):
    data = json.loads(request.body)
    if User.objects.filter(email=data['id']).exists():
        context={
            'result': '이미 존재하는 아이디입니다.'
        }
        return HttpResponse('already exists')

    else:
        User.objects.create(
            email = data['id'],
            name = data['name'],
            password = data['pwd'],
        ).save()
        context={
            'result':'signup'
        }
        return HttpResponse('signup')
