"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Debt {
  id: string
  name: string
  amount: number
  interest: number
  dueDate: string
}

export default function DebtsPage() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: "1", name: "Mortgage", amount: 200000, interest: 3.5, dueDate: "2023-10-15" },
    { id: "2", name: "Car Loan", amount: 15000, interest: 4.2, dueDate: "2023-10-20" },
    { id: "3", name: "Credit Card", amount: 3000, interest: 18.9, dueDate: "2023-10-25" },
  ])

  const [newDebt, setNewDebt] = useState({
    name: "",
    amount: "",
    interest: "",
    dueDate: "",
  })

  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0)
  const annualIncome = 83000 // Example annual income
  const debtToIncomeRatio = (totalDebt / annualIncome) * 100

  const handleAddDebt = () => {
    if (newDebt.name && newDebt.amount && newDebt.interest && newDebt.dueDate) {
      const debt: Debt = {
        id: Date.now().toString(),
        name: newDebt.name,
        amount: Number.parseFloat(newDebt.amount),
        interest: Number.parseFloat(newDebt.interest),
        dueDate: newDebt.dueDate,
      }

      setDebts([...debts, debt])
      setNewDebt({ name: "", amount: "", interest: "", dueDate: "" })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Debt Management</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Debt</CardTitle>
            <CardDescription>Record a new debt or loan</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAddDebt()
              }}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="debt-name">Debt Name</Label>
                  <Input
                    id="debt-name"
                    placeholder="e.g., Car Loan"
                    value={newDebt.name}
                    onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="debt-amount">Total Amount</Label>
                  <Input
                    id="debt-amount"
                    type="number"
                    placeholder="0.00"
                    value={newDebt.amount}
                    onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="debt-interest">Interest Rate (%)</Label>
                  <Input
                    id="debt-interest"
                    type="number"
                    placeholder="0.00"
                    step="0.1"
                    value={newDebt.interest}
                    onChange={(e) => setNewDebt({ ...newDebt, interest: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="debt-date">Payment Due Date</Label>
                  <Input
                    id="debt-date"
                    type="date"
                    value={newDebt.dueDate}
                    onChange={(e) => setNewDebt({ ...newDebt, dueDate: e.target.value })}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleAddDebt}>
              Add Debt
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Debt Overview</CardTitle>
            <CardDescription>Summary of your current debts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between">
                  <h3 className="font-semibold">Total Debt</h3>
                  <span>${totalDebt.toLocaleString()}</span>
                </div>
                <Progress value={Math.min(debtToIncomeRatio, 100)} className="mt-2" />
                <p className="text-sm text-muted-foreground">{debtToIncomeRatio.toFixed(1)}% of annual income</p>
              </div>
              <div className="max-h-[300px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Debt</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Interest</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {debts.map((debt) => (
                      <TableRow key={debt.id}>
                        <TableCell>{debt.name}</TableCell>
                        <TableCell>${debt.amount.toLocaleString()}</TableCell>
                        <TableCell>{debt.interest}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
