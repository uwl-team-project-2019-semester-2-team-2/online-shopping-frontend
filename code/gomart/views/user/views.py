from flask import Blueprint, render_template, abort
from code.gomart.util import api_util

user = Blueprint('user', __name__)


@user.route('/')
def index():
    page_basis = api_util.get_page_basic()

    departments = api_util.get('/department')
    if departments is None:
        return abort(500)
    else:
        return render_template('landing.j2', title='GO Mart - Home', page_basis=page_basis)


@user.route('/order-history')
def order_history():
    return 'Order History'


@user.route('/account-info')
def account_info():
    return 'Account info'


@user.route('/addresses')
def addresses():
    return 'Addresses'


@user.route('/payment')
def payment():
    return 'Payment'

