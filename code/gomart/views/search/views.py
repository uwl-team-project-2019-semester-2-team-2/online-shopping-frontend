from flask import Blueprint, render_template, request
from code.gomart.util import api_util
import math

search = Blueprint('search', __name__, url_prefix='/search')


@search.route("/<term>")
def index(term):
    page = request.args.get('page', default=1, type=int)
    order = request.args.get('order', default='relevance', type=str)
    filters = request.args.get('filter', default='', type=str)

    departments = api_util.get('/department')
    products = api_util.get('/search/' + term + '?filter=' + filters + '&page=' + str(page))
    pages = math.ceil(products['page_info']['product_count'] / 25)

    print(pages)
    return render_template(
        'search.j2',
        title='Results for "' + term + '" - GO Mart',
        departments=departments,
        products=products,
        term=term,
        page=page,
        pages=pages,
        order=order
    )
