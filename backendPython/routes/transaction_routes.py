from flask import Blueprint, request, jsonify
from database import get_db_connection

transaction_bp = Blueprint('transaction', __name__)

@transaction_bp.route('/transactions', methods=['GET'])
def get_transactions():
    transaction_id = request.args.get('id')
    wallet_id = request.args.get('wallet_id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if transaction_id:
                cur.execute("SELECT * FROM monetrixModified.transactions WHERE id = %s;", (transaction_id,))
                transaction = cur.fetchone()
                if not transaction:
                    return jsonify({"error": "Transação não encontrada!"}), 404
            elif wallet_id:
                cur.execute("SELECT * FROM monetrixModified.transactions WHERE wallet_id = %s ORDER BY transaction_date DESC;", (wallet_id,))
                transaction = cur.fetchall()
            else:
                cur.execute("SELECT * FROM monetrixModified.transactions ORDER BY transaction_date DESC;")
                transaction = cur.fetchall()
        conn.close()
        return jsonify(transaction), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@transaction_bp.route('/transactions', methods=['POST'])
def create_transaction():
    data = request.get_json()
    wallet_id = data.get("wallet_id")
    category_id = data.get("category_id")
    type = data.get("type")
    amount = data.get("amount")
    description = data.get("description")
    transaction_date = data.get("transaction_date")
    is_recurring = data.get("is_recurring", False)
    recurring_frequency = data.get("recurring_frequency")
    created_by = data.get("created_by")

    if not wallet_id or not category_id or not type or not amount or not transaction_date or not created_by:
        return jsonify({"error": "Missing required fields"}), 400

    if type not in ['income', 'expense']:
        return jsonify({"error": "Invalid transaction type"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO monetrixModified.transactions 
                (wallet_id, category_id, type, amount, description, transaction_date, is_recurring, recurring_frequency, created_by)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
                """,
                (wallet_id, category_id, type, amount, description, transaction_date, is_recurring, recurring_frequency, created_by),
            )
            transaction_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Transação criada com sucesso!", "id": transaction_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@transaction_bp.route('/transactions/<int:id>', methods=['PUT'])
def update_transaction(id):
    data = request.get_json()
    category_id = data.get("category_id")
    type = data.get("type")
    amount = data.get("amount")
    description = data.get("description")
    transaction_date = data.get("transaction_date")
    is_recurring = data.get("is_recurring")
    recurring_frequency = data.get("recurring_frequency")

    if not category_id or not type or not amount or not transaction_date:
        return jsonify({"error": "Missing required fields"}), 400

    if type not in ['income', 'expense']:
        return jsonify({"error": "Invalid transaction type"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE monetrixModified.transactions
                SET category_id = %s, type = %s, amount = %s, description = %s, 
                    transaction_date = %s, is_recurring = %s, recurring_frequency = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s;
                """,
                (category_id, type, amount, description, transaction_date, is_recurring, recurring_frequency, id),
            )
            if cur.rowcount == 0:
                return jsonify({"error": "Transação não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Transação atualizada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@transaction_bp.route('/transactions/<int:id>', methods=['DELETE'])
def delete_transaction(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM monetrixModified.transactions WHERE id = %s;", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "Transação não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Transação deletada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
