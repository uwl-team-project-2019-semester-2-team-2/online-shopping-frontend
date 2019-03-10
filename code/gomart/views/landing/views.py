from flask import Blueprint, render_template
from code.gomart.util import api_util

landing = Blueprint('landing', __name__)


@landing.route('/')
def index():
    departments = api_util.get('/department')
    if departments is None:
        return 'Fuck'
    else:
        return render_template('landing.j2', title='GO Mart - Home', departments=departments)
