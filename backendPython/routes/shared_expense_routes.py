from flask import Blueprint, request, jsonify
from database import get_db_connection

shared_expense_bp = Blueprint('shared_expense', __name__)

@shared_expense_bp.route('/shared-expenses', methods=['GET'])
def get_shared_expenses():
    expense_id = request.args.get('id')
    wallet_id = request.args.get('wallet_id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if expense_id:
                cur.execute("SELECT * FROM monetrixModified.shared_expenses WHERE id = %s;", (expense_id,))
                expense = cur.fetchone()
                if not expense:
                    return jsonify({"error": "Despesa compartilhada não encontrada!"}), 404
            elif wallet_id:
                cur.execute("SELECT * FROM monetrixModified.shared_expenses WHERE wallet_id = %s;", (wallet_id,))
                expense = cur.fetchall()
            else:
                cur.execute("SELECT * FROM monetrixModified.shared_expenses;")
                expense = cur.fetchall()
        conn.close()
        return jsonify(expense), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@shared_expense_bp.route('/shared-expenses', methods=['POST'])
def create_shared_expense():
    data = request.get_json()
    wallet_id = data.get("wallet_id")
    name = data.get("name")
    total_amount = data.get("total_amount")
    paid_by = data.get("paid_by")
    expense_date = data.get("expense_date")
    split_type = data.get("split_type", "equal")
    description = data.get("description")

    if not wallet_id or not name or not total_amount or not paid_by or not expense_date:
        return jsonify({"error": "Missing required fields"}), 400

    if split_type not in ['equal', 'custom']:
        return jsonify({"error": "Invalid split type"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO monetrixModified.shared_expenses 
                (wallet_id, name, total_amount, paid_by, expense_date, split_type, description)
                VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id;
                """,
                (wallet_id, name, total_amount, paid_by, expense_date, split_type, description),
            )
            expense_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Despesa compartilhada criada com sucesso!", "id": expense_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@shared_expense_bp.route('/shared-expenses/<int:id>', methods=['PUT'])
def update_shared_expense(id):
    data = request.get_json()
    name = data.get("name")
    total_amount = data.get("total_amount")
    paid_by = data.get("paid_by")
    expense_date = data.get("expense_date")
    split_type = data.get("split_type")
    description = data.get("description")

    if not name or not total_amount or not paid_by or not expense_date:
        return jsonify({"error": "Missing required fields"}), 400

    if split_type and split_type not in ['equal', 'custom']:
        return jsonify({"error": "Invalid split type"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE monetrixModified.shared_expenses
                SET name = %s, total_amount = %s, paid_by = %s, expense_date = %s, 
                    split_type = %s, description = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s;
                """,
                (name, total_amount, paid_by, expense_date, split_type, description, id),
            )
            if cur.rowcount == 0:
                return jsonify({"error": "Despesa compartilhada não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Despesa compartilhada atualizada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@shared_expense_bp.route('/shared-expenses/<int:id>', methods=['DELETE'])
def delete_shared_expense(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM monetrixModified.shared_expenses WHERE id = %s;", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "Despesa compartilhada não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Despesa compartilhada deletada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
