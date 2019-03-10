import requests
import json


def get(path):
    url = 'http://localhost:8080' + path
    response = requests.get(url)

    if response.ok:
        response_json = json.loads(response.content)
        return response_json
    else:
        return None

