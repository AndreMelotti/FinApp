from flask import Blueprint, request, jsonify
from database import get_db_connection

shared_expense_split_bp = Blueprint('shared_expense_split', __name__)

@shared_expense_split_bp.route('/shared-expense-splits', methods=['GET'])
def get_shared_expense_splits():
    split_id = request.args.get('id')
    shared_expense_id = request.args.get('shared_expense_id')
    user_id = request.args.get('user_id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if split_id:
                cur.execute("SELECT * FROM monetrixModified.shared_expense_splits WHERE id = %s;", (split_id,))
                split = cur.fetchone()
                if not split:
                    return jsonify({"error": "Divisão não encontrada!"}), 404
            elif shared_expense_id:
                cur.execute("SELECT * FROM monetrixModified.shared_expense_splits WHERE shared_expense_id = %s;", (shared_expense_id,))
                split = cur.fetchall()
            elif user_id:
                cur.execute("SELECT * FROM monetrixModified.shared_expense_splits WHERE user_id = %s;", (user_id,))
                split = cur.fetchall()
            else:
                cur.execute("SELECT * FROM monetrixModified.shared_expense_splits;")
                split = cur.fetchall()
        conn.close()
        return jsonify(split), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@shared_expense_split_bp.route('/shared-expense-splits', methods=['POST'])
def create_shared_expense_split():
    data = request.get_json()
    shared_expense_id = data.get("shared_expense_id")
    user_id = data.get("user_id")
    amount = data.get("amount")
    is_paid = data.get("is_paid", False)

    if not shared_expense_id or not user_id or not amount:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO monetrixModified.shared_expense_splits (shared_expense_id, user_id, amount, is_paid)
                VALUES (%s, %s, %s, %s) RETURNING id;
                """,
                (shared_expense_id, user_id, amount, is_paid),
            )
            split_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Divisão criada com sucesso!", "id": split_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@shared_expense_split_bp.route('/shared-expense-splits/<int:id>', methods=['PUT'])
def update_shared_expense_split(id):
    data = request.get_json()
    amount = data.get("amount")
    is_paid = data.get("is_paid")
    paid_at = data.get("paid_at")

    if not amount:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE monetrixModified.shared_expense_splits
                SET amount = %s, is_paid = %s, paid_at = %s
                WHERE id = %s;
                """,
                (amount, is_paid, paid_at, id),
            )
            if cur.rowcount == 0:
                return jsonify({"error": "Divisão não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Divisão atualizada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@shared_expense_split_bp.route('/shared-expense-splits/<int:id>', methods=['DELETE'])
def delete_shared_expense_split(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM monetrixModified.shared_expense_splits WHERE id = %s;", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "Divisão não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Divisão deletada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
