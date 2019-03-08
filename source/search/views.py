from flask import Blueprint, render_template, request
import requests
import json

bp = Blueprint('search', __name__)

def get_page_json(term, page):
    url = "http://localhost:8080/search/" + term + "?page=" + str(page)
    response = requests.get(url)

    if response.ok:
        response_json = json.loads(response.content)
        return response_json
    else:
        return nil

@bp.route("/<term>")
def index(term):
    page = request.args.get('page', default=1, type=int)
    print(page)


    products = get_page_json(term, page)
    if products is None:
        return "Fuck"
    else:
        return render_template("search.j2", title='GO Mart - Home', products=products, term=term)
