from flask import Blueprint, render_template, abort
from code.gomart.util import api_util

landing = Blueprint('landing', __name__)


@landing.route('/')
def index():
    page_basic = api_util.get_page_basic()

    if page_basic is None:
        return abort(500)

    return render_template(
        'landing.j2',
        title='Home',
        page_basis=page_basic)
