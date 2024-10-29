import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, CreditCard, DollarSign, PiggyBank, Target, Users } from "lucide-react"

export function TopBar() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/new-home">
            <h1 className="text-2xl font-bold">FinanceManager</h1>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/new-home">
              <Button variant="ghost">
                <BarChart className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/personal-management">
              <Button variant="ghost">
                <DollarSign className="mr-2 h-4 w-4" />
                Personal
              </Button>
            </Link>
            <Link href="/shared-management">
              <Button variant="ghost">
                <Users className="mr-2 h-4 w-4" />
                Shared
              </Button>
            </Link>
            <Link href="/investment-portfolio">
              <Button variant="ghost">
                <PiggyBank className="mr-2 h-4 w-4" />
                Investments
              </Button>
            </Link>
            <Link href="/goals">
              <Button variant="ghost">
                <Target className="mr-2 h-4 w-4" />
                Goals
              </Button>
            </Link>
            <Link href="/debts">
              <Button variant="ghost">
                <CreditCard className="mr-2 h-4 w-4" />
                Debts
              </Button>
            </Link>
            <Link href="/new-profile">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}