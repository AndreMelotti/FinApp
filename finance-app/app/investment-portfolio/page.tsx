"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Fixed Income", value: 40 },
  { name: "Investment Funds", value: 30 },
  { name: "Real Estate Funds", value: 20 },
  { name: "Stocks", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function InvestmentPortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Investment Portfolio</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
          <CardDescription>Your current investment allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Tabs defaultValue="fixed-income">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="fixed-income">Fixed Income</TabsTrigger>
          <TabsTrigger value="investment-funds">Investment Funds</TabsTrigger>
          <TabsTrigger value="real-estate-funds">Real Estate Funds</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
        </TabsList>
        <TabsContent value="fixed-income">
          <Card>
            <CardHeader>
              <CardTitle>Fixed Income</CardTitle>
              <CardDescription>Your fixed income investments</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Treasury Bonds: $10,000</li>
                <li>Corporate Bonds: $5,000</li>
                <li>CDs: $3,000</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="investment-funds">
          <Card>
            <CardHeader>
              <CardTitle>Investment Funds</CardTitle>
              <CardDescription>Your investment fund holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Global Equity Fund: $7,000</li>
                <li>Technology Sector Fund: $4,000</li>
                <li>Emerging Markets Fund: $2,000</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="real-estate-funds">
          <Card>
            <CardHeader>
              <CardTitle>Real Estate Funds</CardTitle>
              <CardDescription>Your real estate fund investments</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Residential REIT: $3,000</li>
                <li>Commercial REIT: $2,000</li>
                <li>Industrial REIT: $1,000</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stocks">
          <Card>
            <CardHeader>
              <CardTitle>Stocks</CardTitle>
              <CardDescription>Your individual stock holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Tech Company A: 10 shares, $1,500</li>
                <li>Bank B: 20 shares, $1,000</li>
                <li>Retail Company C: 15 shares, $750</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
