from flask import Blueprint, request, jsonify
from database import get_db_connection

wallet_bp = Blueprint('wallet', __name__)

@wallet_bp.route('/wallets', methods=['GET'])
def get_wallets():
    wallet_id = request.args.get('id')
    owner_id = request.args.get('owner_id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if wallet_id:
                cur.execute("SELECT * FROM monetrixModified.wallets WHERE id = %s;", (wallet_id,))
                wallet = cur.fetchone()
                if not wallet:
                    return jsonify({"error": "Carteira não encontrada!"}), 404
            elif owner_id:
                cur.execute("SELECT * FROM monetrixModified.wallets WHERE owner_id = %s;", (owner_id,))
                wallet = cur.fetchall()
            else:
                cur.execute("SELECT * FROM monetrixModified.wallets;")
                wallet = cur.fetchall()
        conn.close()
        return jsonify(wallet), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@wallet_bp.route('/wallets', methods=['POST'])
def create_wallet():
    data = request.get_json()
    name = data.get("name")
    type = data.get("type")
    color = data.get("color", "from-blue-500 to-blue-600")
    balance = data.get("balance", 0.00)
    owner_id = data.get("owner_id")

    if not name or not type or not owner_id:
        return jsonify({"error": "Missing required fields"}), 400

    if type not in ['personal', 'shared']:
        return jsonify({"error": "Invalid wallet type"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO monetrixModified.wallets (name, type, color, balance, owner_id)
                VALUES (%s, %s, %s, %s, %s) RETURNING id;
                """,
                (name, type, color, balance, owner_id),
            )
            wallet_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Carteira criada com sucesso!", "id": wallet_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@wallet_bp.route('/wallets/<int:id>', methods=['PUT'])
def update_wallet(id):
    data = request.get_json()
    name = data.get("name")
    type = data.get("type")
    color = data.get("color")
    balance = data.get("balance")

    if not name or not type:
        return jsonify({"error": "Missing required fields"}), 400

    if type not in ['personal', 'shared']:
        return jsonify({"error": "Invalid wallet type"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE monetrixModified.wallets
                SET name = %s, type = %s, color = %s, balance = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s;
                """,
                (name, type, color, balance, id),
            )
            if cur.rowcount == 0:
                return jsonify({"error": "Carteira não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Carteira atualizada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@wallet_bp.route('/wallets/<int:id>', methods=['DELETE'])
def delete_wallet(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM monetrixModified.wallets WHERE id = %s;", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "Carteira não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Carteira deletada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
