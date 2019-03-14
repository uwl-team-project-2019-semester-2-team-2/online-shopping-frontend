from flask import Blueprint, render_template, abort
from code.gomart.util import api_util

product = Blueprint('product', __name__)


@product.route('/')
def index():
    departments = api_util.get('/department')
    if departments is None:
        return abort(500)
    else:
        return render_template('landing.j2', title='GO Mart - Home', departments=departments)
