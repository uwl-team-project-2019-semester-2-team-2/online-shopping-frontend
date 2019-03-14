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


def get_page_basic():
    page_basic = {}

    departments = get('/department')

    if departments is None:
        return None

    page_basic['departments'] = departments

    return page_basic
