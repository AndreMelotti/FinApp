from flask import Blueprint, request, jsonify
from database import get_db_connection

investment_category_bp = Blueprint('investment_category', __name__)

@investment_category_bp.route('/investment-categories', methods=['GET'])
def get_investment_categories():
    category_id = request.args.get('id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if category_id:
                cur.execute("SELECT * FROM monetrixModified.investment_categories WHERE id = %s;", (category_id,))
                category = cur.fetchone()
                if not category:
                    return jsonify({"error": "Categoria não encontrada!"}), 404
            else:
                cur.execute("SELECT * FROM monetrixModified.investment_categories;")
                category = cur.fetchall()
        conn.close()
        return jsonify(category), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@investment_category_bp.route('/investment-categories', methods=['POST'])
def create_investment_category():
    data = request.get_json()
    name = data.get("name")
    description = data.get("description")

    if not name:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO monetrixModified.investment_categories (name, description)
                VALUES (%s, %s) RETURNING id;
                """,
                (name, description),
            )
            category_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Categoria criada com sucesso!", "id": category_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@investment_category_bp.route('/investment-categories/<int:id>', methods=['PUT'])
def update_investment_category(id):
    data = request.get_json()
    name = data.get("name")
    description = data.get("description")

    if not name:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE monetrixModified.investment_categories
                SET name = %s, description = %s
                WHERE id = %s;
                """,
                (name, description, id),
            )
            if cur.rowcount == 0:
                return jsonify({"error": "Categoria não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Categoria atualizada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@investment_category_bp.route('/investment-categories/<int:id>', methods=['DELETE'])
def delete_investment_category(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM monetrixModified.investment_categories WHERE id = %s;", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "Categoria não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Categoria deletada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
