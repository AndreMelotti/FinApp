"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Globe, HandshakeIcon, Users } from "lucide-react"
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

export default function Home() {
  // In a real application, you would fetch this data from an API

  const [dollar, setDollar]: any = useState([])

  // useEffect(()=>{
  //   fetch("https://economia.awesomeapi.com.br/last/USD-BRL")
  //   .then((response)=> {return response.json()})
  //   .then((json)=>setDollar(json.USDBRL.high))
  //   .then((dollar)=>console.log(dollar))
  //   .catch((err)=> console.log(err))
  // },[])

  useEffect(()=>{
    fetch("https://economia.awesomeapi.com.br/last/USD-BRL")
    .then((response)=> {return response.json()})
    .then((json)=>setDollar(json.USDBRL.high))
    .then((dollar)=>console.log(dollar))
    .catch((err)=> console.log(err))
  },[])

  console.log(dollar)

  // const dollarCurrency = fetch("https://economia.awesomeapi.com.br/last/USD-BRL")
  //                       .then((response)=> {return response.json()})
  //                       .then((data)=> console.log(data))
  //                       // .then((data)=> console.log(data.USDBRL))
  //                       .catch((error)=> console.log(error))

  // async function getData(){
  //   const x =  await dollarCurrency as any as Object
  // //   const y = x
  //   console.log(x)
  //   return x
  // }

  // console.log(getData())
  // console.log(dollarCurrency.toString())
  // console.log(dollarCurrency.USDBRL)

  const dollarNumber = dollar as number
  console.log(typeof(dollarNumber))

  const currencies = [
    { name: 'US Dollar (USD)', value: dollarNumber },
    { name: 'Euro (EUR)', value: 5.51 },
    { name: 'Bitcoin (BTC)', value: 145000.00 },
  ]

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Currency & Finance SaaS</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Currency Rates (in BRL)</h2>
          <ul className="space-y-4">
            {currencies.map((currency) => (
              <li key={currency.name} className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">{currency.name}</span>
                <span className="text-lg">R$ {currency.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <Link href="/finance" className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Go to Personal Finance
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </main>
  )
}