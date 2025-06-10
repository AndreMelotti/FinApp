from flask import Blueprint, request, jsonify
from database import get_db_connection

user_bp = Blueprint('user', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    user_id = request.args.get('id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if user_id:
                cur.execute("SELECT * FROM monetrixModified.users WHERE id = %s;", (user_id,))
                user = cur.fetchone()
                if not user:
                    return jsonify({"error": "Usuário não encontrado!"}), 404
            else:
                cur.execute("SELECT * FROM monetrixModified.users;")
                user = cur.fetchall()
        conn.close()
        return jsonify(user), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    password_hash = data.get("password_hash")
    avatar_url = data.get("avatar_url")

    if not name or not email or not password_hash:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO monetrixModified.users (name, email, phone, password_hash, avatar_url)
                VALUES (%s, %s, %s, %s, %s) RETURNING id;
                """,
                (name, email, phone, password_hash, avatar_url),
            )
            user_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Usuário criado com sucesso!", "id": user_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@user_bp.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    password_hash = data.get("password_hash")
    avatar_url = data.get("avatar_url")

    if not name or not email or not password_hash:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE monetrixModified.users
                SET name = %s, email = %s, phone = %s, password_hash = %s, avatar_url = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s;
                """,
                (name, email, phone, password_hash, avatar_url, id),
            )
            if cur.rowcount == 0:
                return jsonify({"error": "Usuário não encontrado!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Usuário atualizado com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@user_bp.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM monetrixModified.users WHERE id = %s;", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "Usuário não encontrado!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Usuário deletado com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
