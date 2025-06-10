from flask import Blueprint, request, jsonify
from database import get_db_connection

financial_goal_bp = Blueprint('financial_goal', __name__)

@financial_goal_bp.route('/financial-goals', methods=['GET'])
def get_financial_goals():
    goal_id = request.args.get('id')
    wallet_id = request.args.get('wallet_id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if goal_id:
                cur.execute("SELECT * FROM monetrixModified.financial_goals WHERE id = %s;", (goal_id,))
                goal = cur.fetchone()
                if not goal:
                    return jsonify({"error": "Meta não encontrada!"}), 404
            elif wallet_id:
                cur.execute("SELECT * FROM monetrixModified.financial_goals WHERE wallet_id = %s;", (wallet_id,))
                goal = cur.fetchall()
            else:
                cur.execute("SELECT * FROM monetrixModified.financial_goals;")
                goal = cur.fetchall()
        conn.close()
        return jsonify(goal), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@financial_goal_bp.route('/financial-goals', methods=['POST'])
def create_financial_goal():
    data = request.get_json()
    wallet_id = data.get("wallet_id")
    name = data.get("name")
    description = data.get("description")
    target_amount = data.get("target_amount")
    current_amount = data.get("current_amount", 0.00)
    target_date = data.get("target_date")
    color = data.get("color", "from-blue-500 to-blue-600")
    created_by = data.get("created_by")

    if not wallet_id or not name or not target_amount or not target_date or not created_by:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO monetrixModified.financial_goals 
                (wallet_id, name, description, target_amount, current_amount, target_date, color, created_by)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
                """,
                (wallet_id, name, description, target_amount, current_amount, target_date, color, created_by),
            )
            goal_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Meta criada com sucesso!", "id": goal_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@financial_goal_bp.route('/financial-goals/<int:id>', methods=['PUT'])
def update_financial_goal(id):
    data = request.get_json()
    name = data.get("name")
    description = data.get("description")
    target_amount = data.get("target_amount")
    current_amount = data.get("current_amount")
    target_date = data.get("target_date")
    color = data.get("color")
    is_completed = data.get("is_completed")

    if not name or not target_amount or not target_date:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE monetrixModified.financial_goals
                SET name = %s, description = %s, target_amount = %s, current_amount = %s, 
                    target_date = %s, color = %s, is_completed = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s;
                """,
                (name, description, target_amount, current_amount, target_date, color, is_completed, id),
            )
            if cur.rowcount == 0:
                return jsonify({"error": "Meta não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Meta atualizada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@financial_goal_bp.route('/financial-goals/<int:id>', methods=['DELETE'])
def delete_financial_goal(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM monetrixModified.financial_goals WHERE id = %s;", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "Meta não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Meta deletada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
