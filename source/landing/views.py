from flask import Blueprint, render_template
import requests
import json

bp = Blueprint('landing', __name__)

def get_page_json():
    url = "http://localhost:8080/department"
    response = requests.get(url)

    if response.ok:
        response_json = json.loads(response.content)
        return response_json
    else:
        return nil

@bp.route("/")
def index():
    departments = get_page_json()
    if departments is None:
        return "Fuck"
    else:
        return render_template("landing.j2", title='GO Mart - Home', departments=departments)
