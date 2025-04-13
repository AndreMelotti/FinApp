"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const incomeData = [
  { category: "Salary", amount: 4000, percentage: "75.5%" },
  { category: "Freelance", amount: 1000, percentage: "18.9%" },
  { category: "Investments", amount: 300, percentage: "5.6%" },
]

const expenseData = [
  { category: "Housing", amount: 1500, percentage: "30.0%" },
  { category: "Food", amount: 750, percentage: "15.0%" },
  { category: "Transportation", amount: 500, percentage: "10.0%" },
  { category: "Utilities", amount: 400, percentage: "8.0%" },
  { category: "Entertainment", amount: 300, percentage: "6.0%" },
  { category: "Healthcare", amount: 250, percentage: "5.0%" },
  { category: "Shopping", amount: 400, percentage: "8.0%" },
  { category: "Savings", amount: 900, percentage: "18.0%" },
]

const investmentData = [
  { category: "Stocks", amount: 10000, return: "8.5%" },
  { category: "Bonds", amount: 5000, return: "3.2%" },
  { category: "Real Estate Funds", amount: 7000, return: "6.8%" },
  { category: "Mutual Funds", amount: 8000, return: "7.1%" },
]

const debtData = [
  { type: "Mortgage", amount: 200000, interest: "3.5%", payment: 1200 },
  { type: "Car Loan", amount: 15000, interest: "4.2%", payment: 300 },
  { type: "Credit Card", amount: 3000, interest: "18.9%", payment: 150 },
  { type: "Student Loan", amount: 20000, interest: "5.5%", payment: 250 },
]

const monthlyExpenseData = [
  { name: "Jan", amount: 2400 },
  { name: "Feb", amount: 1398 },
  { name: "Mar", amount: 9800 },
  { name: "Apr", amount: 3908 },
  { name: "May", amount: 4800 },
  { name: "Jun", amount: 3800 },
]

const categoryExpenseData = [
  { name: "Housing", value: 1500 },
  { name: "Food", value: 750 },
  { name: "Transportation", value: 500 },
  { name: "Utilities", value: 400 },
  { name: "Other", value: 850 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4560"]

export default function ReportsPage() {
  const [reportType, setReportType] = useState("dashboard")
  const [dateRange, setDateRange] = useState("month")

  const generateReport = () => {
    // This would generate a downloadable report
    alert(`Generating ${reportType} report for ${dateRange} range`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Financial Reports</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>Select the type of report you want to generate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dashboard">Dashboard Report</SelectItem>
                <SelectItem value="pdf">PDF Report</SelectItem>
                <SelectItem value="excel">Excel Report</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={generateReport}>Generate Report</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="income-expense">
        <TabsList className="w-full grid grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="income-expense">Income & Expenses</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="debts">Debts</TabsTrigger>
        </TabsList>

        <TabsContent value="income-expense">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Income & Expenses Report</CardTitle>
                <CardDescription>Overview of your financial activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3} className="font-bold">
                        Income
                      </TableCell>
                    </TableRow>
                    {incomeData.map((row, i) => (
                      <TableRow key={`income-${i}`}>
                        <TableCell>{row.category}</TableCell>
                        <TableCell>${row.amount.toLocaleString()}</TableCell>
                        <TableCell>{row.percentage}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="font-bold">
                        Expenses
                      </TableCell>
                    </TableRow>
                    {expenseData.map((row, i) => (
                      <TableRow key={`expense-${i}`}>
                        <TableCell>{row.category}</TableCell>
                        <TableCell>${row.amount.toLocaleString()}</TableCell>
                        <TableCell>{row.percentage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={monthlyExpenseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={categoryExpenseData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryExpenseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="investments">
          <Card>
            <CardHeader>
              <CardTitle>Investments Report</CardTitle>
              <CardDescription>Summary of your investment portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Investment Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Return</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investmentData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>${row.amount.toLocaleString()}</TableCell>
                      <TableCell>{row.return}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debts">
          <Card>
            <CardHeader>
              <CardTitle>Debts Report</CardTitle>
              <CardDescription>Overview of your current debts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Debt Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Interest Rate</TableHead>
                    <TableHead>Monthly Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {debtData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>${row.amount.toLocaleString()}</TableCell>
                      <TableCell>{row.interest}</TableCell>
                      <TableCell>${row.payment.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
