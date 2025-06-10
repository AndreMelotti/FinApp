from flask import Blueprint, request, jsonify
from database import get_db_connection

investment_bp = Blueprint('investment', __name__)

@investment_bp.route('/investments', methods=['GET'])
def get_investments():
    investment_id = request.args.get('id')
    wallet_id = request.args.get('wallet_id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if investment_id:
                cur.execute("SELECT * FROM monetrixModified.investments WHERE id = %s;", (investment_id,))
                investment = cur.fetchone()
                if not investment:
                    return jsonify({"error": "Investimento não encontrado!"}), 404
            elif wallet_id:
                cur.execute("SELECT * FROM monetrixModified.investments WHERE wallet_id = %s;", (wallet_id,))
                investment = cur.fetchall()
            else:
                cur.execute("SELECT * FROM monetrixModified.investments;")
                investment = cur.fetchall()
        conn.close()
        return jsonify(investment), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@investment_bp.route('/investments', methods=['POST'])
def create_investment():
    data = request.get_json()
    wallet_id = data.get("wallet_id")
    category_id = data.get("category_id")
    name = data.get("name")
    amount = data.get("amount")
    return_rate = data.get("return_rate")
    purchase_date = data.get("purchase_date")
    quantity = data.get("quantity")
    unit_price = data.get("unit_price")
    current_value = data.get("current_value")
    created_by = data.get("created_by")

    if not wallet_id or not category_id or not name or not amount or not purchase_date or not created_by:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO monetrixModified.investments 
                (wallet_id, category_id, name, amount, return_rate, purchase_date, quantity, unit_price, current_value, created_by)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
                """,
                (wallet_id, category_id, name, amount, return_rate, purchase_date, quantity, unit_price, current_value, created_by),
            )
            investment_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Investimento criado com sucesso!", "id": investment_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@investment_bp.route('/investments/<int:id>', methods=['PUT'])
def update_investment(id):
    data = request.get_json()
    category_id = data.get("category_id")
    name = data.get("name")
    amount = data.get("amount")
    return_rate = data.get("return_rate")
    purchase_date = data.get("purchase_date")
    quantity = data.get("quantity")
    unit_price = data.get("unit_price")
    current_value = data.get("current_value")

    if not category_id or not name or not amount or not purchase_date:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE monetrixModified.investments
                SET category_id = %s, name = %s, amount = %s, return_rate = %s, purchase_date = %s, 
                    quantity = %s, unit_price = %s, current_value = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s;
                """,
                (category_id, name, amount, return_rate, purchase_date, quantity, unit_price, current_value, id),
            )
            if cur.rowcount == 0:
                return jsonify({"error": "Investimento não encontrado!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Investimento atualizado com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@investment_bp.route('/investments/<int:id>', methods=['DELETE'])
def delete_investment(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM monetrixModified.investments WHERE id = %s;", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "Investimento não encontrado!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Investimento deletado com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
