from flask import Blueprint, request, jsonify
from database import get_db_connection

debt_bp = Blueprint('debt', __name__)

@debt_bp.route('/debts', methods=['GET'])
def get_debts():
    debt_id = request.args.get('id')
    wallet_id = request.args.get('wallet_id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if debt_id:
                cur.execute("SELECT * FROM monetrixModified.debts WHERE id = %s;", (debt_id,))
                debt = cur.fetchone()
                if not debt:
                    return jsonify({"error": "Dívida não encontrada!"}), 404
            elif wallet_id:
                cur.execute("SELECT * FROM monetrixModified.debts WHERE wallet_id = %s;", (wallet_id,))
                debt = cur.fetchall()
            else:
                cur.execute("SELECT * FROM monetrixModified.debts;")
                debt = cur.fetchall()
        conn.close()
        return jsonify(debt), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@debt_bp.route('/debts', methods=['POST'])
def create_debt():
    data = request.get_json()
    wallet_id = data.get("wallet_id")
    name = data.get("name")
    total_amount = data.get("total_amount")
    remaining_amount = data.get("remaining_amount")
    interest_rate = data.get("interest_rate")
    installments = data.get("installments")
    due_date = data.get("due_date")
    monthly_payment = data.get("monthly_payment")
    created_by = data.get("created_by")

    if not wallet_id or not name or not total_amount or not remaining_amount or not interest_rate or not due_date or not created_by:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO monetrixModified.debts 
                (wallet_id, name, total_amount, remaining_amount, interest_rate, installments, due_date, monthly_payment, created_by)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
                """,
                (wallet_id, name, total_amount, remaining_amount, interest_rate, installments, due_date, monthly_payment, created_by),
            )
            debt_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Dívida criada com sucesso!", "id": debt_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@debt_bp.route('/debts/<int:id>', methods=['PUT'])
def update_debt(id):
    data = request.get_json()
    name = data.get("name")
    total_amount = data.get("total_amount")
    remaining_amount = data.get("remaining_amount")
    interest_rate = data.get("interest_rate")
    installments = data.get("installments")
    due_date = data.get("due_date")
    monthly_payment = data.get("monthly_payment")
    is_paid_off = data.get("is_paid_off")

    if not name or not total_amount or not remaining_amount or not interest_rate or not due_date:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE monetrixModified.debts
                SET name = %s, total_amount = %s, remaining_amount = %s, interest_rate = %s, 
                    installments = %s, due_date = %s, monthly_payment = %s, is_paid_off = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s;
                """,
                (name, total_amount, remaining_amount, interest_rate, installments, due_date, monthly_payment, is_paid_off, id),
            )
            if cur.rowcount == 0:
                return jsonify({"error": "Dívida não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Dívida atualizada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@debt_bp.route('/debts/<int:id>', methods=['DELETE'])
def delete_debt(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM monetrixModified.debts WHERE id = %s;", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "Dívida não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Dívida deletada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
