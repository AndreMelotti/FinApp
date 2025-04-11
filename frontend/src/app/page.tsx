import { BarChart, Calculator, CreditCard, DollarSign, PiggyBank, Target, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardCard } from "@/components/dashboard-card"
import { QuickActionButton } from "@/components/quick-action-button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 2000, expenses: 3500 },
  { name: "Apr", income: 2780, expenses: 3908 },
  { name: "May", income: 1890, expenses: 1800 },
  { name: "Jun", income: 2390, expenses: 1800 },
]

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Financial Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <DashboardCard
          title="Total Balance"
          value="$45,231.89"
          icon={<DollarSign className="h-4 w-4" />}
          trend="+20.1% from last month"
        />
        <DashboardCard
          title="Investments"
          value="$21,345.67"
          icon={<PiggyBank className="h-4 w-4" />}
          trend="+12.3% from last month"
        />
        <DashboardCard
          title="Debts"
          value="$5,678.90"
          icon={<CreditCard className="h-4 w-4" />}
          trend="-3.2% from last month"
        />
        <DashboardCard
          title="Shared Management"
          value="2"
          icon={<Users className="h-4 w-4" />}
          trend="Active shared managements"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Monthly financial overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#22c55e" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your finances</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <QuickActionButton
              href="/personal-management"
              icon={<BarChart className="mr-2 h-4 w-4" />}
              label="Personal Management"
            />
            <QuickActionButton
              href="/shared-management"
              icon={<Users className="mr-2 h-4 w-4" />}
              label="Shared Management"
            />
            <QuickActionButton
              href="/investment-portfolio"
              icon={<PiggyBank className="mr-2 h-4 w-4" />}
              label="Investments"
            />
            <QuickActionButton href="/goals" icon={<Target className="mr-2 h-4 w-4" />} label="Goals" />
            <QuickActionButton href="/debts" icon={<CreditCard className="mr-2 h-4 w-4" />} label="Debts" />
            <QuickActionButton href="/calculators" icon={<Calculator className="mr-2 h-4 w-4" />} label="Calculators" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
