from flask import Blueprint, request, jsonify
from database import get_db_connection

wallet_member_bp = Blueprint('wallet_member', __name__)

@wallet_member_bp.route('/wallet-members', methods=['GET'])
def get_wallet_members():
    wallet_id = request.args.get('wallet_id')
    user_id = request.args.get('user_id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if wallet_id and user_id:
                cur.execute(
                    "SELECT * FROM monetrixModified.wallet_members WHERE wallet_id = %s AND user_id = %s;",
                    (wallet_id, user_id)
                )
                member = cur.fetchone()
                if not member:
                    return jsonify({"error": "Membro não encontrado!"}), 404
            elif wallet_id:
                cur.execute("SELECT * FROM monetrixModified.wallet_members WHERE wallet_id = %s;", (wallet_id,))
                member = cur.fetchall()
            elif user_id:
                cur.execute("SELECT * FROM monetrixModified.wallet_members WHERE user_id = %s;", (user_id,))
                member = cur.fetchall()
            else:
                cur.execute("SELECT * FROM monetrixModified.wallet_members;")
                member = cur.fetchall()
        conn.close()
        return jsonify(member), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@wallet_member_bp.route('/wallet-members', methods=['POST'])
def create_wallet_member():
    data = request.get_json()
    wallet_id = data.get("wallet_id")
    user_id = data.get("user_id")
    role = data.get("role")

    if not wallet_id or not user_id or not role:
        return jsonify({"error": "Missing required fields"}), 400

    if role not in ['owner', 'editor', 'viewer']:
        return jsonify({"error": "Invalid role"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO monetrixModified.wallet_members (wallet_id, user_id, role)
                VALUES (%s, %s, %s) RETURNING id;
                """,
                (wallet_id, user_id, role),
            )
            member_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Membro adicionado com sucesso!", "id": member_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@wallet_member_bp.route('/wallet-members/<int:id>', methods=['PUT'])
def update_wallet_member(id):
    data = request.get_json()
    role = data.get("role")

    if not role:
        return jsonify({"error": "Missing required fields"}), 400

    if role not in ['owner', 'editor', 'viewer']:
        return jsonify({"error": "Invalid role"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE monetrixModified.wallet_members SET role = %s WHERE id = %s;",
                (role, id),
            )
            if cur.rowcount == 0:
                return jsonify({"error": "Membro não encontrado!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Membro atualizado com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@wallet_member_bp.route('/wallet-members/<int:id>', methods=['DELETE'])
def delete_wallet_member(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM monetrixModified.wallet_members WHERE id = %s;", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "Membro não encontrado!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Membro removido com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
