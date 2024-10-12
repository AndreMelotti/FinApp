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
  const [btc, setBtc]: any = useState([])
  const [euro, setEuro]: any = useState([])

  useEffect(()=>{
    fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")
    .then((response)=> {return response.json()})
    .then((json)=>setDollar(json.USDBRL.high))
    // .then((dollar)=>console.log(dollar))
    .catch((err)=> console.log(err))
  },[])

  useEffect(()=>{
    fetch("https://economia.awesomeapi.com.br/last/EUR-BRL")
    .then((response)=> {return response.json()})
    .then((data)=>setEuro(data.EURBRL.high))
    .catch((err)=> console.log(err))
  })

  useEffect(()=>{
    fetch("https://economia.awesomeapi.com.br/last/BTC-BRL")
    .then((response)=> {return response.json()})
    .then((data)=>setBtc(data.BTCBRL.high))
    .catch((err)=> console.log(err))
  })
  
  const currencies = [
    { name: 'Dólar EUA (USD)', value: dollar },
    { name: 'Euro (EUR)', value: euro },
    { name: 'Bitcoin (BTC)', value: btc },
  ]

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Monetrix</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* <h2 className="text-2xl font-semibold mb-4">Cotações em Reais (R$)</h2> */}
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
            Finanças Pessoais
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </main>
  )
}