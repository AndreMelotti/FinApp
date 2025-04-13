"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Calculator, CreditCard, DollarSign, FileText, PiggyBank, Target, Users } from "lucide-react"
import { usePathname } from "next/navigation"

export function TopBar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? "bg-accent" : ""
  }

  return (
    <header className="bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold">GerenciadorFinanceiro</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button variant="ghost" className={isActive("/")}>
                <BarChart className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/gerenciamento-pessoal">
              <Button variant="ghost" className={isActive("/gerenciamento-pessoal")}>
                <DollarSign className="mr-2 h-4 w-4" />
                Pessoal
              </Button>
            </Link>
            <Link href="/gerenciamento-compartilhado">
              <Button variant="ghost" className={isActive("/gerenciamento-compartilhado")}>
                <Users className="mr-2 h-4 w-4" />
                Compartilhado
              </Button>
            </Link>
            <Link href="/carteira-investimentos">
              <Button variant="ghost" className={isActive("/carteira-investimentos")}>
                <PiggyBank className="mr-2 h-4 w-4" />
                Investimentos
              </Button>
            </Link>
            <Link href="/metas">
              <Button variant="ghost" className={isActive("/metas")}>
                <Target className="mr-2 h-4 w-4" />
                Metas
              </Button>
            </Link>
            <Link href="/dividas">
              <Button variant="ghost" className={isActive("/dividas")}>
                <CreditCard className="mr-2 h-4 w-4" />
                Dívidas
              </Button>
            </Link>
            <Link href="/calculadoras">
              <Button variant="ghost" className={isActive("/calculadoras")}>
                <Calculator className="mr-2 h-4 w-4" />
                Calculadoras
              </Button>
            </Link>
            <Link href="/relatorios">
              <Button variant="ghost" className={isActive("/relatorios")}>
                <FileText className="mr-2 h-4 w-4" />
                Relatórios
              </Button>
            </Link>
            <Link href="/perfil">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Usuário" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          </nav>
          <div className="md:hidden">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Usuário" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
