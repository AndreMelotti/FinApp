"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Transaction {
  id: string
  type: "income" | "expense"
  category: string
  amount: number
  date: string
  description?: string
}

export default function PersonalManagementPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", type: "income", category: "Salary", amount: 4000, date: "2023-10-01", description: "Monthly salary" },
    {
      id: "2",
      type: "income",
      category: "Freelance",
      amount: 1000,
      date: "2023-10-05",
      description: "Website project",
    },
    { id: "3", type: "expense", category: "Housing", amount: 1500, date: "2023-10-03", description: "Monthly rent" },
    { id: "4", type: "expense", category: "Food", amount: 400, date: "2023-10-07", description: "Groceries" },
    { id: "5", type: "expense", category: "Transportation", amount: 200, date: "2023-10-10", description: "Fuel" },
    {
      id: "6",
      type: "expense",
      category: "Utilities",
      amount: 150,
      date: "2023-10-15",
      description: "Electricity bill",
    },
  ])

  const [newTransaction, setNewTransaction] = useState<{
    type: "income" | "expense"
    category: string
    amount: string
    date: string
    description: string
  }>({
    type: "income",
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  })

  const incomeCategories = ["Salary", "Freelance", "Investments", "Gifts", "Other"]
  const expenseCategories = [
    "Housing",
    "Food",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Healthcare",
    "Education",
    "Shopping",
    "Debt",
    "Savings",
    "Other",
  ]

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  const handleAddTransaction = (type: "income" | "expense") => {
    if (newTransaction.category && newTransaction.amount && newTransaction.date) {
      const transaction: Transaction = {
        id: Date.now().toString(),
        type,
        category: newTransaction.category,
        amount: Number.parseFloat(newTransaction.amount),
        date: newTransaction.date,
        description: newTransaction.description,
      }

      setTransactions([...transactions, transaction])
      setNewTransaction({
        type,
        category: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Personal Management</h1>
      <Tabs defaultValue="income">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle>Income</CardTitle>
              <CardDescription>Manage your income sources</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAddTransaction("income")
                }}
                className="space-y-4"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="income-category">Income Source</Label>
                    <Select
                      value={newTransaction.category}
                      onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                    >
                      <SelectTrigger id="income-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {incomeCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="income-amount">Amount</Label>
                    <Input
                      id="income-amount"
                      type="number"
                      placeholder="0.00"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="income-date">Date</Label>
                    <Input
                      id="income-date"
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="income-description">Description (Optional)</Label>
                    <Input
                      id="income-description"
                      placeholder="Brief description"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit">Add Income</Button>
              </form>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Recent Income</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions
                      .filter((t) => t.type === "income")
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 5)
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Expenses</CardTitle>
              <CardDescription>Manage your expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAddTransaction("expense")
                }}
                className="space-y-4"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expense-category">Expense Category</Label>
                    <Select
                      value={newTransaction.category}
                      onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                    >
                      <SelectTrigger id="expense-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expense-amount">Amount</Label>
                    <Input
                      id="expense-amount"
                      type="number"
                      placeholder="0.00"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expense-date">Date</Label>
                    <Input
                      id="expense-date"
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expense-description">Description (Optional)</Label>
                    <Input
                      id="expense-description"
                      placeholder="Brief description"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit">Add Expense</Button>
              </form>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Recent Expenses</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions
                      .filter((t) => t.type === "expense")
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 5)
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Overview of your personal finances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-600 dark:text-green-400">Total Income</h3>
                    <p className="text-2xl font-bold">${totalIncome.toLocaleString()}</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-600 dark:text-red-400">Total Expenses</h3>
                    <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
                  </div>
                  <div
                    className={`${balance >= 0 ? "bg-blue-50 dark:bg-blue-950" : "bg-amber-50 dark:bg-amber-950"} p-4 rounded-lg`}
                  >
                    <h3
                      className={`font-semibold ${balance >= 0 ? "text-blue-600 dark:text-blue-400" : "text-amber-600 dark:text-amber-400"}`}
                    >
                      Balance
                    </h3>
                    <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Expense Breakdown</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>% of Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenseCategories
                        .map((category) => {
                          const categorySum = transactions
                            .filter((t) => t.type === "expense" && t.category === category)
                            .reduce((sum, t) => sum + t.amount, 0)

                          const percentage =
                            totalExpenses > 0 ? ((categorySum / totalExpenses) * 100).toFixed(1) : "0.0"

                          return {
                            category,
                            amount: categorySum,
                            percentage,
                          }
                        })
                        .filter((c) => c.amount > 0)
                        .sort((a, b) => b.amount - a.amount)
                        .map((item) => (
                          <TableRow key={item.category}>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>${item.amount.toLocaleString()}</TableCell>
                            <TableCell>{item.percentage}%</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
