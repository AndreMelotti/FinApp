from flask import Blueprint, request, jsonify
from database import get_db_connection

expense_goal_bp = Blueprint('expense_goal', __name__)

@expense_goal_bp.route('/expense-goals', methods=['GET'])
def get_expense_goals():
    goal_id = request.args.get('id')
    wallet_id = request.args.get('wallet_id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if goal_id:
                cur.execute("SELECT * FROM monetrixModified.expense_goals WHERE id = %s;", (goal_id,))
                goal = cur.fetchone()
                if not goal:
                    return jsonify({"error": "Meta de gasto não encontrada!"}), 404
            elif wallet_id:
                cur.execute("SELECT * FROM monetrixModified.expense_goals WHERE wallet_id = %s;", (wallet_id,))
                goal = cur.fetchall()
            else:
                cur.execute("SELECT * FROM monetrixModified.expense_goals;")
                goal = cur.fetchall()
        conn.close()
        return jsonify(goal), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@expense_goal_bp.route('/expense-goals', methods=['POST'])
def create_expense_goal():
    data = request.get_json()
    wallet_id = data.get("wallet_id")
    category_id = data.get("category_id")
    percentage = data.get("percentage")
    color = data.get("color", "hsl(var(--chart-1))")
    created_by = data.get("created_by")

    if not wallet_id or not category_id or not percentage or not created_by:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO monetrixModified.expense_goals (wallet_id, category_id, percentage, color, created_by)
                VALUES (%s, %s, %s, %s, %s) RETURNING id;
                """,
                (wallet_id, category_id, percentage, color, created_by),
            )
            goal_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Meta de gasto criada com sucesso!", "id": goal_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@expense_goal_bp.route('/expense-goals/<int:id>', methods=['PUT'])
def update_expense_goal(id):
    data = request.get_json()
    percentage = data.get("percentage")
    color = data.get("color")

    if not percentage:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE monetrixModified.expense_goals
                SET percentage = %s, color = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s;
                """,
                (percentage, color, id),
            )
            if cur.rowcount == 0:
                return jsonify({"error": "Meta de gasto não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Meta de gasto atualizada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

@expense_goal_bp.route('/expense-goals/<int:id>', methods=['DELETE'])
def delete_expense_goal(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM monetrixModified.expense_goals WHERE id = %s;", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "Meta de gasto não encontrada!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Meta de gasto deletada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
