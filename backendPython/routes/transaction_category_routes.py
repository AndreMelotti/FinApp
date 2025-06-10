from flask import Blueprint, request, jsonify
from database import get_db_connection

transaction_category_bp = Blueprint('transaction_category', __name__)

@transaction_category_bp.route('/transaction-categories', methods=['GET'])
def get_transaction_categories():
    category_id = request.args.get('id')
    wallet_id = request.args.get('wallet_id')
    type = request.args.get('type')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if category_id:
                cur.execute("SELECT * FROM monetrixModified.transaction_categories WHERE id = %s;", (category_id,))
                category = cur.fetchone()
                if not category:
                    return jsonify({"error": "Categoria não encontrada!"}), 404
            elif wallet_id and type:
                cur.execute("SELECT * FROM monetrixModified.transaction_categories WHERE wallet_id = %s AND type = %s;", (wallet_id, type))
                category = cur.fetchall()
            elif wallet_id:
                cur.execute("SELECT * FROM monetrixModified.transaction_categories WHERE wallet_id = %s;", (wallet_id,))
                category = cur.fetchall()
            elif type:
                cur.execute("SELECT * FROM monetrixModified.transaction_categories WHERE type = %s;", (type,))
                category = cur.fetchall()
            else:
                cur.execute("SELECT * FROM monetrixModified.transaction_categories;")
                category = cur.fetchall()
        conn.close()
        return jsonify(category), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@transaction_category_bp.route('/transaction-categories', methods=['POST'])
def create_transaction_category():
    data = request.get_json()
    name = data.get("name")
    type = data.get("type")
    wallet_id = data.get("wallet_id")
    is_default = data.get("is_default", False)

    if not name or not type:
        return jsonify({"error": "Missing required fields"}), 400

    if type not in ['income', 'expense']:
        return jsonify({"error": "Invalid category type"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO monetrixModified.transaction_categories (name, type, wallet_id, is_default)
                VALUES (%s, %s, %s, %s) RETURNING id;
                """,
                (name, type, wallet_id, is_default),
            )
            category_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Categoria criada com sucesso!", "id": category_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@transaction_category_bp.route('/transaction-categories/<int:id>', methods=['PUT'])
def update_transaction_category(id):
    data = request.get_json()
    name = data.get("name")
    type = data.get("type")
    is_default = data.get("is_default")

    if not name or not type:
        return jsonify({"error": "Missing required fields"}), 400

    if type not in ['income', 'expense']:
        return jsonify({"error": "Invalid category type"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE monetrixModified.transaction_categories
                SET name = %s, type = %s, is_default = %s
                WHERE id = %s;
                """,
                (name, type, is_default, id),
            )
            if cur.rowcount == 0:
                return jsonify({"error": "Categoria não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Categoria atualizada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@transaction_category_bp.route('/transaction-categories/<int:id>', methods=['DELETE'])
def delete_transaction_category(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM monetrixModified.transaction_categories WHERE id = %s;", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "Categoria não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Categoria deletada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
