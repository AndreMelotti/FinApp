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
            <h1 className="text-2xl font-bold">FinanceManager</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button variant="ghost" className={isActive("/")}>
                <BarChart className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/personal-management">
              <Button variant="ghost" className={isActive("/personal-management")}>
                <DollarSign className="mr-2 h-4 w-4" />
                Personal
              </Button>
            </Link>
            <Link href="/shared-management">
              <Button variant="ghost" className={isActive("/shared-management")}>
                <Users className="mr-2 h-4 w-4" />
                Shared
              </Button>
            </Link>
            <Link href="/investment-portfolio">
              <Button variant="ghost" className={isActive("/investment-portfolio")}>
                <PiggyBank className="mr-2 h-4 w-4" />
                Investments
              </Button>
            </Link>
            <Link href="/goals">
              <Button variant="ghost" className={isActive("/goals")}>
                <Target className="mr-2 h-4 w-4" />
                Goals
              </Button>
            </Link>
            <Link href="/debts">
              <Button variant="ghost" className={isActive("/debts")}>
                <CreditCard className="mr-2 h-4 w-4" />
                Debts
              </Button>
            </Link>
            <Link href="/calculators">
              <Button variant="ghost" className={isActive("/calculators")}>
                <Calculator className="mr-2 h-4 w-4" />
                Calculators
              </Button>
            </Link>
            <Link href="/reports">
              <Button variant="ghost" className={isActive("/reports")}>
                <FileText className="mr-2 h-4 w-4" />
                Reports
              </Button>
            </Link>
            <Link href="/profile">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          </nav>
          <div className="md:hidden">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
