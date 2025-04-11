"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(1000)
  const [rate, setRate] = useState(5)
  const [time, setTime] = useState(10)
  const [compound, setCompound] = useState(12)
  const [result, setResult] = useState<{
    finalAmount: string
    totalInterest: string
    years: Array<{
      year: number
      amount: string
      interest: string
    }>
  } | null>(null)

  const calculateCompoundInterest = () => {
    const n = Number(compound)
    const t = Number(time)
    const r = Number(rate) / 100
    const P = Number(principal)

    const amount = P * Math.pow(1 + r / n, n * t)
    const interest = amount - P

    setResult({
      finalAmount: amount.toFixed(2),
      totalInterest: interest.toFixed(2),
      years: Array.from({ length: t }, (_, i) => {
        const year = i + 1
        const yearlyAmount = P * Math.pow(1 + r / n, n * year)
        return {
          year,
          amount: yearlyAmount.toFixed(2),
          interest: (yearlyAmount - P).toFixed(2),
        }
      }),
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calculator</CardTitle>
          <CardDescription>Enter your investment details</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              calculateCompoundInterest()
            }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="principal">Initial Investment</Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input id="rate" type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time Period (Years)</Label>
              <Input id="time" type="number" value={time} onChange={(e) => setTime(Number(e.target.value))} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="compound">Compound Frequency</Label>
              <Select value={compound.toString()} onValueChange={(value) => setCompound(Number(value))}>
                <SelectTrigger id="compound">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="2">Semi-annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={calculateCompoundInterest}>
            Calculate
          </Button>
        </CardFooter>
      </Card>
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>Compound interest calculation results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Final Amount</h3>
                <p className="text-2xl font-bold">${result.finalAmount}</p>
              </div>
              <div>
                <h3 className="font-semibold">Total Interest Earned</h3>
                <p className="text-2xl font-bold">${result.totalInterest}</p>
              </div>
              <div className="max-h-[300px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Interest</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.years.map((year) => (
                      <TableRow key={year.year}>
                        <TableCell>{year.year}</TableCell>
                        <TableCell>${year.amount}</TableCell>
                        <TableCell>${year.interest}</TableCell>
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
