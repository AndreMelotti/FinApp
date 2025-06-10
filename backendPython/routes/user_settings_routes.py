from flask import Blueprint, request, jsonify
from database import get_db_connection

user_settings_bp = Blueprint('user_settings', __name__)

@user_settings_bp.route('/user-settings', methods=['GET'])
def get_user_settings():
    settings_id = request.args.get('id')
    user_id = request.args.get('user_id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if settings_id:
                cur.execute("SELECT * FROM monetrixModified.user_settings WHERE id = %s;", (settings_id,))
                settings = cur.fetchone()
                if not settings:
                    return jsonify({"error": "Configurações não encontradas!"}), 404
            elif user_id:
                cur.execute("SELECT * FROM monetrixModified.user_settings WHERE user_id = %s;", (user_id,))
                settings = cur.fetchone()
                if not settings:
                    return jsonify({"error": "Configurações não encontradas!"}), 404
            else:
                cur.execute("SELECT * FROM monetrixModified.user_settings;")
                settings = cur.fetchall()
        conn.close()
        return jsonify(settings), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@user_settings_bp.route('/user-settings', methods=['POST'])
def create_user_settings():
    data = request.get_json()
    user_id = data.get("user_id")
    default_wallet_id = data.get("default_wallet_id")
    currency = data.get("currency", "BRL")
    language = data.get("language", "pt-BR")
    timezone = data.get("timezone", "America/Sao_Paulo")
    notifications_enabled = data.get("notifications_enabled", True)

    if not user_id:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO monetrixModified.user_settings 
                (user_id, default_wallet_id, currency, language, timezone, notifications_enabled)
                VALUES (%s, %s, %s, %s, %s, %s) RETURNING id;
                """,
                (user_id, default_wallet_id, currency, language, timezone, notifications_enabled),
            )
            settings_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Configurações criadas com sucesso!", "id": settings_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@user_settings_bp.route('/user-settings/<int:id>', methods=['PUT'])
def update_user_settings(id):
    data = request.get_json()
    default_wallet_id = data.get("default_wallet_id")
    currency = data.get("currency")
    language = data.get("language")
    timezone = data.get("timezone")
    notifications_enabled = data.get("notifications_enabled")

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE monetrixModified.user_settings
                SET default_wallet_id = %s, currency = %s, language = %s, 
                    timezone = %s, notifications_enabled = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s;
                """,
                (default_wallet_id, currency, language, timezone, notifications_enabled, id),
            )
            if cur.rowcount == 0:
                return jsonify({"error": "Configurações não encontradas!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Configurações atualizadas com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@user_settings_bp.route('/user-settings/<int:id>', methods=['DELETE'])
def delete_user_settings(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM monetrixModified.user_settings WHERE id = %s;", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "Configurações não encontradas!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Configurações deletadas com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
