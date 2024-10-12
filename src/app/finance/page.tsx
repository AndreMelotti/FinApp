'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function Finance() {
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'income', description: 'Salário', amount: 5000 },
    { id: 2, type: 'expense', description: 'Aluguel', amount: 1500 },
    { id: 3, type: 'income', description: 'Freelance', amount: 1000 },
    { id: 4, type: 'expense', description: 'Mercado', amount: 300 },
  ])

  const [newTransaction, setNewTransaction] = useState({
    type: 'income',
    description: '',
    amount: '',
  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setNewTransaction({ ...newTransaction, [name]: value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (newTransaction.description && newTransaction.amount) {
      setTransactions([
        ...transactions,
        {
          id: transactions.length + 1,
          ...newTransaction,
          amount: parseFloat(newTransaction.amount),
        },
      ])
      setNewTransaction({ type: 'income', description: '', amount: '' })
    }
  }

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Finanças Pessoais</h1>
          <Link href="/" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Voltar para Página Inicial
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Adicionar Transações</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Tipo</label>
                <select
                  name="type"
                  value={newTransaction.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="income">Entrada</option>
                  <option value="expense">Despesa</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Descrição</label>
                <input
                  type="text"
                  name="description"
                  value={newTransaction.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Valor</label>
                <input
                  type="number"
                  name="amount"
                  value={newTransaction.amount}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Adicionar Transação
              </button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Transações</h2>
            <ul className="space-y-2">
              {transactions.map((transaction) => (
                <li key={transaction.id} className="flex justify-between items-center">
                  <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                    {transaction.description}
                  </span>
                  <span className="font-semibold">
                    R$ {transaction.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Total Entradas:</span>
                <span className="text-green-600">R$ {totalIncome.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Total Gastos/Despesas:</span>
                <span className="text-red-600">R$ {totalExpenses.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Saldo:</span>
                <span className={balance >= 0 ? 'text-green-600' : 'text-red-600'}>
                  R$ {balance.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}