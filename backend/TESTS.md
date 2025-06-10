# API Testing Data

This directory contains JSON files for testing the API endpoints of the Financial Management API.

## Available Test Data

| File | Description | Endpoint |
|------|-------------|----------|
| `users.json` | Create a new user | POST /users |
| `wallets.json` | Create a new wallet | POST /wallets |
| `transaction-categories.json` | Create a transaction category | POST /transaction-categories |
| `transactions.json` | Create a transaction | POST /transactions |
| `debts.json` | Create a debt | POST /debts |
| `financial-goals.json` | Create a financial goal | POST /financial-goals |
| `expense-goals.json` | Create an expense goal | POST /expense-goals |
| `investment-categories.json` | Create an investment category | POST /investment-categories |
| `investments.json` | Create an investment | POST /investments |
| `shared-expenses.json` | Create a shared expense | POST /shared-expenses |
| `shared-expense-splits.json` | Create a shared expense split | POST /shared-expense-splits |
| `user-settings.json` | Create user settings | POST /user-settings |
| `wallet-members.json` | Add a member to a wallet | POST /wallet-members |

## How to Use

### Using cURL

\`\`\`bash
# Example: Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d @users.json
\`\`\`

### Using the Test Script

1. Make the script executable:
   \`\`\`bash
   chmod +x test-api.sh
   \`\`\`

2. Run the script:
   \`\`\`bash
   ./test-api.sh
   \`\`\`

## Testing Order

When testing manually, follow this order to ensure proper relationships:

1. Create a user
2. Create a wallet (requires user ID)
3. Create transaction categories
4. Create transactions
5. Create other entities

## Notes

- The test data assumes IDs starting from 1
- You may need to adjust IDs based on your database state
- Some entities have dependencies on others (e.g., transactions need wallet_id and category_id)


```http file="test-data/api-requests.http"
@baseUrl = http://localhost:3000

### Create a user
POST {{baseUrl}}/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "password_hash": "$2a$12$1234567890123456789012345678901234567890",
  "avatar_url": "https://randomuser.me/api/portraits/men/1.jpg"
}

### Create a second user
POST {{baseUrl}}/users
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "+1987654321",
  "password_hash": "$2a$12$0987654321098765432109876543210987654321",
  "avatar_url": "https://randomuser.me/api/portraits/women/1.jpg"
}

### Create a wallet
POST {{baseUrl}}/wallets
Content-Type: application/json

{
  "name": "Personal Finances",
  "type": "personal",
  "color": "from-blue-500 to-blue-600",
  "balance": 5000.00,
  "owner_id": 1
}

### Create a transaction category
POST {{baseUrl}}/transaction-categories
Content-Type: application/json

{
  "name": "Groceries",
  "type": "expense",
  "wallet_id": 1,
  "is_default": false
}

### Create a transaction
POST {{baseUrl}}/transactions
Content-Type: application/json

{
  "wallet_id": 1,
  "category_id": 1,
  "type": "expense",
  "amount": 125.50,
  "description": "Weekly grocery shopping",
  "transaction_date": "2024-06-10",
  "is_recurring": false,
  "created_by": 1
}

### Create a debt
POST {{baseUrl}}/debts
Content-Type: application/json

{
  "wallet_id": 1,
  "name": "Car Loan",
  "total_amount": 25000.00,
  "remaining_amount": 18500.00,
  "interest_rate": 4.5,
  "installments": 60,
  "due_date": "2028-06-10",
  "monthly_payment": 450.00,
  "is_paid_off": false,
  "created_by": 1
}

### Create a financial goal
POST {{baseUrl}}/financial-goals
Content-Type: application/json

{
  "wallet_id": 1,
  "name": "Emergency Fund",
  "description": "6 months of expenses",
  "target_amount": 15000.00,
  "current_amount": 5000.00,
  "target_date": "2025-12-31",
  "color": "from-green-500 to-green-600",
  "is_completed": false,
  "created_by": 1
}

### Create an expense goal
POST {{baseUrl}}/expense-goals
Content-Type: application/json

{
  "wallet_id": 1,
  "category_id": 1,
  "percentage": 15.00,
  "color": "hsl(var(--chart-1))",
  "created_by": 1
}

### Create an investment category
POST {{baseUrl}}/investment-categories
Content-Type: application/json

{
  "name": "Stocks",
  "description": "Public company stocks and ETFs"
}

### Create an investment
POST {{baseUrl}}/investments
Content-Type: application/json

{
  "wallet_id": 1,
  "category_id": 1,
  "name": "AAPL",
  "amount": 5000.00,
  "return_rate": 8.5,
  "purchase_date": "2023-01-15",
  "quantity": 25.0000,
  "unit_price": 200.00,
  "current_value": 5250.00,
  "created_by": 1
}

### Create a shared expense
POST {{baseUrl}}/shared-expenses
Content-Type: application/json

{
  "wallet_id": 1,
  "name": "Dinner with friends",
  "total_amount": 120.00,
  "paid_by": 1,
  "expense_date": "2024-06-09",
  "split_type": "equal",
  "description": "Italian restaurant downtown"
}

### Create a shared expense split
POST {{baseUrl}}/shared-expense-splits
Content-Type: application/json

{
  "shared_expense_id": 1,
  "user_id": 2,
  "amount": 40.00,
  "is_paid": false
}

### Create user settings
POST {{baseUrl}}/user-settings
Content-Type: application/json

{
  "user_id": 1,
  "default_wallet_id": 1,
  "currency": "USD",
  "language": "en-US",
  "timezone": "America/New_York",
  "notifications_enabled": true
}

### Add a wallet member
POST {{baseUrl}}/wallet-members
Content-Type: application/json

{
  "wallet_id": 1,
  "user_id": 2,
  "role": "viewer"
}

### Get all users
GET {{baseUrl}}/users

### Get all wallets
GET {{baseUrl}}/wallets

### Get all transactions
GET {{baseUrl}}/transactions

### Get transactions by wallet
GET {{baseUrl}}/transactions/wallet/1

### Get transactions by type
GET {{baseUrl}}/transactions?type=expense
