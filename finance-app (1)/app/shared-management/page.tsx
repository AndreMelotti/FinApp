"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Member {
  id: string
  name: string
  avatar?: string
  initials: string
}

interface SharedExpense {
  id: string
  group: "family" | "roommates"
  name: string
  amount: number
  paidBy: string
  date: string
  split: "equal" | "custom"
  shares?: Record<string, number>
}

export default function SharedManagementPage() {
  const [familyMembers] = useState<Member[]>([
    { id: "1", name: "John Doe", initials: "JD" },
    { id: "2", name: "Jane Doe", initials: "JD" },
    { id: "3", name: "Kid Doe", initials: "KD" },
  ])

  const [roommateMembers] = useState<Member[]>([
    { id: "4", name: "Alice", initials: "A" },
    { id: "5", name: "Bob", initials: "B" },
    { id: "6", name: "Charlie", initials: "C" },
  ])

  const [expenses, setExpenses] = useState<SharedExpense[]>([
    {
      id: "1",
      group: "family",
      name: "Groceries",
      amount: 120,
      paidBy: "1",
      date: "2023-10-15",
      split: "equal",
    },
    {
      id: "2",
      group: "family",
      name: "Utilities",
      amount: 80,
      paidBy: "2",
      date: "2023-10-10",
      split: "equal",
    },
    {
      id: "3",
      group: "roommates",
      name: "Rent",
      amount: 1200,
      paidBy: "4",
      date: "2023-10-01",
      split: "equal",
    },
    {
      id: "4",
      group: "roommates",
      name: "Internet",
      amount: 60,
      paidBy: "5",
      date: "2023-10-05",
      split: "equal",
    },
  ])

  const [newExpense, setNewExpense] = useState<{
    group: "family" | "roommates"
    name: string
    amount: string
    paidBy: string
    date: string
    split: "equal" | "custom"
  }>({
    group: "family",
    name: "",
    amount: "",
    paidBy: "",
    date: new Date().toISOString().split("T")[0],
    split: "equal",
  })

  const handleAddExpense = (group: "family" | "roommates") => {
    if (newExpense.name && newExpense.amount && newExpense.paidBy && newExpense.date) {
      const expense: SharedExpense = {
        id: Date.now().toString(),
        group,
        name: newExpense.name,
        amount: Number.parseFloat(newExpense.amount),
        paidBy: newExpense.paidBy,
        date: newExpense.date,
        split: newExpense.split,
      }

      setExpenses([...expenses, expense])
      setNewExpense({
        group,
        name: "",
        amount: "",
        paidBy: "",
        date: new Date().toISOString().split("T")[0],
        split: "equal",
      })
    }
  }

  const getMemberName = (id: string) => {
    const allMembers = [...familyMembers, ...roommateMembers]
    const member = allMembers.find((m) => m.id === id)
    return member ? member.name : "Unknown"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Shared Management</h1>
      <Tabs defaultValue="family">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="family">Family Budget</TabsTrigger>
          <TabsTrigger value="roommates">Roommates Expenses</TabsTrigger>
        </TabsList>
        <TabsContent value="family">
          <Card>
            <CardHeader>
              <CardTitle>Family Budget</CardTitle>
              <CardDescription>Manage shared family expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Members</h3>
                <div className="flex space-x-2">
                  {familyMembers.map((member) => (
                    <Avatar key={member.id}>
                      <AvatarImage src={member.avatar || `/placeholder.svg?height=32&width=32`} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAddExpense("family")
                }}
                className="space-y-4"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expense-name">Expense Name</Label>
                    <Input
                      id="expense-name"
                      placeholder="e.g., Groceries, Utilities"
                      value={newExpense.name}
                      onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expense-amount">Amount</Label>
                    <Input
                      id="expense-amount"
                      type="number"
                      placeholder="0.00"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expense-paid-by">Paid By</Label>
                    <Select
                      value={newExpense.paidBy}
                      onValueChange={(value) => setNewExpense({ ...newExpense, paidBy: value })}
                    >
                      <SelectTrigger id="expense-paid-by">
                        <SelectValue placeholder="Select member" />
                      </SelectTrigger>
                      <SelectContent>
                        {familyMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expense-date">Date</Label>
                    <Input
                      id="expense-date"
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit">Add Shared Expense</Button>
              </form>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Recent Family Expenses</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Expense</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Paid By</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses
                      .filter((e) => e.group === "family")
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell>{expense.name}</TableCell>
                          <TableCell>${expense.amount.toLocaleString()}</TableCell>
                          <TableCell>{getMemberName(expense.paidBy)}</TableCell>
                          <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="roommates">
          <Card>
            <CardHeader>
              <CardTitle>Roommates Expenses</CardTitle>
              <CardDescription>Manage shared expenses with roommates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Roommates</h3>
                <div className="flex space-x-2">
                  {roommateMembers.map((member) => (
                    <Avatar key={member.id}>
                      <AvatarImage src={member.avatar || `/placeholder.svg?height=32&width=32`} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAddExpense("roommates")
                }}
                className="space-y-4"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="roommate-expense-name">Expense Name</Label>
                    <Input
                      id="roommate-expense-name"
                      placeholder="e.g., Rent, Internet"
                      value={newExpense.name}
                      onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="roommate-expense-amount">Amount</Label>
                    <Input
                      id="roommate-expense-amount"
                      type="number"
                      placeholder="0.00"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="roommate-expense-paid-by">Paid By</Label>
                    <Select
                      value={newExpense.paidBy}
                      onValueChange={(value) => setNewExpense({ ...newExpense, paidBy: value })}
                    >
                      <SelectTrigger id="roommate-expense-paid-by">
                        <SelectValue placeholder="Select roommate" />
                      </SelectTrigger>
                      <SelectContent>
                        {roommateMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="roommate-expense-date">Date</Label>
                    <Input
                      id="roommate-expense-date"
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit">Add Shared Expense</Button>
              </form>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Recent Roommate Expenses</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Expense</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Paid By</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses
                      .filter((e) => e.group === "roommates")
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell>{expense.name}</TableCell>
                          <TableCell>${expense.amount.toLocaleString()}</TableCell>
                          <TableCell>{getMemberName(expense.paidBy)}</TableCell>
                          <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
