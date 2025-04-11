"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function LoanPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(100000)
  const [loanTerm, setLoanTerm] = useState(30)
  const [interestRate, setInterestRate] = useState(4.5)
  const [result, setResult] = useState<{
    monthlyPayment: string
    totalPayment: string
    totalInterest: string
    amortizationSchedule: Array<{
      year: number
      payment: string
      principal: string
      interest: string
      balance: string
    }>
  } | null>(null)

  const calculateLoanPayment = () => {
    const P = Number(loanAmount)
    const r = Number(interestRate) / 100 / 12
    const n = Number(loanTerm) * 12

    // Monthly payment formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    const monthlyPayment = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
    const totalPayment = monthlyPayment * n
    const totalInterest = totalPayment - P

    // Generate yearly amortization schedule
    let remainingBalance = P
    const yearlyData = []

    for (let year = 1; year <= Number(loanTerm); year++) {
      let yearlyPrincipal = 0
      let yearlyInterest = 0

      for (let month = 1; month <= 12; month++) {
        const monthlyInterest = remainingBalance * r
        const monthlyPrincipal = monthlyPayment - monthlyInterest

        yearlyPrincipal += monthlyPrincipal
        yearlyInterest += monthlyInterest
        remainingBalance -= monthlyPrincipal
      }

      yearlyData.push({
        year,
        payment: (yearlyPrincipal + yearlyInterest).toFixed(2),
        principal: yearlyPrincipal.toFixed(2),
        interest: yearlyInterest.toFixed(2),
        balance: remainingBalance > 0 ? remainingBalance.toFixed(2) : "0.00",
      })
    }

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      amortizationSchedule: yearlyData,
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Loan Calculator</CardTitle>
          <CardDescription>Calculate your monthly loan payments</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              calculateLoanPayment()
            }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="loan-amount">Loan Amount</Label>
              <Input
                id="loan-amount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="loan-term">Loan Term (Years)</Label>
              <Input
                id="loan-term"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="interest-rate">Annual Interest Rate (%)</Label>
              <Input
                id="interest-rate"
                type="number"
                value={interestRate}
                step="0.1"
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={calculateLoanPayment}>
            Calculate
          </Button>
        </CardFooter>
      </Card>
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>Loan payment calculation results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Monthly Payment</h3>
                <p className="text-2xl font-bold">${result.monthlyPayment}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Total Payment</h3>
                  <p className="text-xl font-bold">${result.totalPayment}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Total Interest</h3>
                  <p className="text-xl font-bold">${result.totalInterest}</p>
                </div>
              </div>
              <div className="max-h-[300px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.amortizationSchedule.map((row) => (
                      <TableRow key={row.year}>
                        <TableCell>{row.year}</TableCell>
                        <TableCell>${row.payment}</TableCell>
                        <TableCell>${row.interest}</TableCell>
                        <TableCell>${row.balance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
