from flask import Flask
from .landing import bp as landing_bp
from .search import bp as search_bp

app = Flask(__name__)
app.config.from_object('config')

app.register_blueprint(landing_bp)
app.register_blueprint(search_bp, url_prefix='/search')
