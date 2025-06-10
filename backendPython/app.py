from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_bp
from routes.wallet_routes import wallet_bp
from routes.wallet_member_routes import wallet_member_bp
from routes.transaction_category_routes import transaction_category_bp
from routes.transaction_routes import transaction_bp
from routes.financial_goal_routes import financial_goal_bp
from routes.debt_routes import debt_bp
from routes.investment_category_routes import investment_category_bp
from routes.investment_routes import investment_bp
from routes.expense_goal_routes import expense_goal_bp
from routes.shared_expense_routes import shared_expense_bp
from routes.shared_expense_split_routes import shared_expense_split_bp
from routes.user_settings_routes import user_settings_bp

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
CORS(app)

# Register all blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(wallet_bp, url_prefix='/api')
app.register_blueprint(wallet_member_bp, url_prefix='/api')
app.register_blueprint(transaction_category_bp, url_prefix='/api')
app.register_blueprint(transaction_bp, url_prefix='/api')
app.register_blueprint(financial_goal_bp, url_prefix='/api')
app.register_blueprint(debt_bp, url_prefix='/api')
app.register_blueprint(investment_category_bp, url_prefix='/api')
app.register_blueprint(investment_bp, url_prefix='/api')
app.register_blueprint(expense_goal_bp, url_prefix='/api')
app.register_blueprint(shared_expense_bp, url_prefix='/api')
app.register_blueprint(shared_expense_split_bp, url_prefix='/api')
app.register_blueprint(user_settings_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run()
