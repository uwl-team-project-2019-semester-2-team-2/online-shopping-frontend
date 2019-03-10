from flask import Flask
from .views.landing.views import landing
from .views.search.views import search
from .views.orders.views import orders
from .views.user_account.views import user_account
from .views.basket.views import basket
from .views.stock.views import stock

app = Flask(__name__, instance_relative_config=True)

app.register_blueprint(landing)
app.register_blueprint(search)

