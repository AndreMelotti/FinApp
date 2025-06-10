"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface WalletData {
  id: string
  name: string
  balance: number
  income: number
  expenses: number
  savings: number
  savingsGoal: number
  expenseCategories: Array<{ name: string; value: number }>
  recentTransactions: Array<{
    id: number
    description: string
    amount: number
    date: string
    category: string
  }>
}

interface WalletContextType {
  wallets: WalletData[]
  selectedWallet: WalletData | null
  setSelectedWallet: (wallet: WalletData) => void
  selectedWalletId: string
  setSelectedWalletId: (id: string) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const mockWallets: WalletData[] = [
  {
    id: "personal-1",
    name: "Minha Carteira Principal",
    balance: 5280.42,
    income: 6500,
    expenses: 3800,
    savings: 2700,
    savingsGoal: 5000,
    expenseCategories: [
      { name: "Moradia", value: 40 },
      { name: "Alimentação", value: 25 },
      { name: "Transporte", value: 15 },
      { name: "Lazer", value: 10 },
      { name: "Outros", value: 10 },
    ],
    recentTransactions: [
      { id: 1, description: "Supermercado", amount: -256.78, date: "Hoje", category: "Alimentação" },
      { id: 2, description: "Salário", amount: 3250.0, date: "Ontem", category: "Receita" },
      { id: 3, description: "Netflix", amount: -39.9, date: "24/04", category: "Entretenimento" },
      { id: 4, description: "Uber", amount: -28.5, date: "23/04", category: "Transporte" },
    ],
  },
  {
    id: "personal-2",
    name: "Investimentos Pessoais",
    balance: 45231.89,
    income: 1500,
    expenses: 0,
    savings: 1500,
    savingsGoal: 1500,
    expenseCategories: [
      { name: "Renda Fixa", value: 60 },
      { name: "Ações", value: 20 },
      { name: "Fundos Imobiliários", value: 15 },
      { name: "Criptomoedas", value: 5 },
    ],
    recentTransactions: [
      { id: 1, description: "Aporte Mensal", amount: 1500.0, date: "Hoje", category: "Investimento" },
      { id: 2, description: "Dividendos", amount: 320.45, date: "15/04", category: "Rendimento" },
      { id: 3, description: "Venda de Ações", amount: 1200.0, date: "10/04", category: "Resgate" },
      { id: 4, description: "Aporte Adicional", amount: 1000.0, date: "01/04", category: "Investimento" },
    ],
  },
  {
    id: "shared-1",
    name: "Orçamento Familiar",
    balance: 8750.33,
    income: 10000,
    expenses: 7500,
    savings: 2500,
    savingsGoal: 3000,
    expenseCategories: [
      { name: "Moradia", value: 35 },
      { name: "Alimentação", value: 25 },
      { name: "Educação", value: 15 },
      { name: "Transporte", value: 10 },
      { name: "Saúde", value: 10 },
      { name: "Outros", value: 5 },
    ],
    recentTransactions: [
      { id: 1, description: "Escola", amount: -1200.0, date: "Hoje", category: "Educação" },
      { id: 2, description: "Salário João", amount: 6000.0, date: "Ontem", category: "Receita" },
      { id: 3, description: "Salário Maria", amount: 4000.0, date: "Ontem", category: "Receita" },
      { id: 4, description: "Supermercado", amount: -450.67, date: "23/04", category: "Alimentação" },
    ],
  },
  {
    id: "shared-2",
    name: "Viagem com Amigos",
    balance: 3200,
    income: 1500,
    expenses: 0,
    savings: 1500,
    savingsGoal: 6000,
    expenseCategories: [
      { name: "João", value: 33.3 },
      { name: "Carlos", value: 33.3 },
      { name: "Ana", value: 33.3 },
    ],
    recentTransactions: [
      { id: 1, description: "Contribuição João", amount: 500.0, date: "Hoje", category: "Depósito" },
      { id: 2, description: "Contribuição Carlos", amount: 500.0, date: "Hoje", category: "Depósito" },
      { id: 3, description: "Contribuição Ana", amount: 500.0, date: "Hoje", category: "Depósito" },
      { id: 4, description: "Contribuição João", amount: 500.0, date: "15/04", category: "Depósito" },
    ],
  },
]

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedWalletId, setSelectedWalletId] = useState<string>("personal-1")
  const [wallets] = useState<WalletData[]>(mockWallets)

  const selectedWallet = wallets.find((wallet) => wallet.id === selectedWalletId) || wallets[0]

  const setSelectedWallet = (wallet: WalletData) => {
    setSelectedWalletId(wallet.id)
  }

  return (
    <WalletContext.Provider
      value={{
        wallets,
        selectedWallet,
        setSelectedWallet,
        selectedWalletId,
        setSelectedWalletId,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
