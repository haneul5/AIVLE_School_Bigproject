import os
import openai

def STT(audio_path, output_path):
    # 키 인증
    openai.api_key = ''
    # 현재 파일 경로
    current = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_path = os.path.join(current, 'media/text')

    f = open(audio_path, "rb")
    transcript = openai.Audio.transcribe("whisper-1", f)

    # 파일 열기
    with open(output_path, "w") as file:
        # 파일에 내용 쓰기
        file.write(transcript['text'])