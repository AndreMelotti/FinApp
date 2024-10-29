"use client"


// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Briefcase, Globe, HandshakeIcon, Users } from "lucide-react"
// import { ArrowRightIcon } from '@heroicons/react/24/solid'

// import { useEffect, useState } from 'react'

// export default function Home() {
//   // In a real application, you would fetch this data from an API

//   const [dollar, setDollar]: any = useState<string>("")
//   const [btc, setBtc]: any = useState<string>("")
//   const [euro, setEuro]: any = useState<string>("")

//   useEffect(()=>{
//     fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")
//     .then((response)=> {if (!response.ok) {
//       throw new Error('Network response was not ok');
//     } return response.json()})
//     .then((json)=>setDollar(json.USDBRL.high))
//     // .then((dollar)=>console.log(dollar))
//     .catch((err)=> console.log(err))
//   },[])

//   useEffect(()=>{
//     fetch("https://economia.awesomeapi.com.br/last/EUR-BRL")
//     .then((response)=> {return response.json()})
//     .then((data)=>setEuro(data.EURBRL.high))
//     .catch((err)=> console.log(err))
//   },[])

//   useEffect(()=>{
//     fetch("https://economia.awesomeapi.com.br/last/BTC-BRL")
//     .then((response)=> {return response.json()})
//     .then((data)=>setBtc(data.BTCBRL.high))
//     .catch((err)=> console.log(err))
//   },[])
  
//   const currencies = [
//     { name: 'Dólar EUA (USD)', value: dollar },
//     { name: 'Euro (EUR)', value: euro },
//     { name: 'Bitcoin (BTC)', value: btc },
//   ]

//   return (
//     <main className="min-h-screen bg-gray-100">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-8 text-center text-primary">Monetrix</h1>
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           {/* <h2 className="text-2xl font-semibold mb-4">Cotações em Reais (R$)</h2> */}
//           <ul className="space-y-4">
//             {currencies.map((currency) => (
//               <li key={currency.name} className="flex justify-between items-center border-b pb-2">
//                 <span className="font-medium">{currency.name}</span>
//                 <span className="text-lg">R$ {currency.value}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="text-center">
//           <Link href="/finance" className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
//             Finanças Pessoais
//             <ArrowRightIcon className="w-5 h-5 ml-2" />
//           </Link>
//         </div>
//       </div>
//     </main>
//   )
// }

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import Link from "next/link"

const data = [
  { name: 'Fixed Income', value: 40 },
  { name: 'Investment Funds', value: 30 },
  { name: 'Real Estate Funds', value: 20 },
  { name: 'Stocks', value: 10 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

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
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
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
        <TabsList>
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
      <div className="mt-6">
        <Link href="/">
          <Button variant="link">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}