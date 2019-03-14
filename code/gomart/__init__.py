from flask import Flask
from .views.landing.views import landing
from .views.search.views import search
from .views.user.views import user
from .views.basket.views import basket
from .views.product.views import product
from .views.admin.views import admin

app = Flask(__name__, instance_relative_config=True)

app.register_blueprint(landing, url_prefix='/')
app.register_blueprint(basket, url_prefix='/basket')
app.register_blueprint(user, url_prefix='/user')
app.register_blueprint(search, url_prefix='/search')
app.register_blueprint(admin, url_prefix='/admin')
app.register_blueprint(product, url_prefix='/product')


@app.route('/sign-in')
def sign_in():
    return 'Sign in'


@app.route('/register')
def sign_in():
    return 'Sign in'

