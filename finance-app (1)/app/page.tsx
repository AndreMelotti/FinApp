import { BarChart, Calculator, CreditCard, DollarSign, PiggyBank, Target, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardCard } from "@/components/dashboard-card"
import { QuickActionButton } from "@/components/quick-action-button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", receita: 4000, despesas: 2400 },
  { name: "Fev", receita: 3000, despesas: 1398 },
  { name: "Mar", receita: 2000, despesas: 3500 },
  { name: "Abr", receita: 2780, despesas: 3908 },
  { name: "Mai", receita: 1890, despesas: 1800 },
  { name: "Jun", receita: 2390, despesas: 1800 },
]

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Financeiro</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <DashboardCard
          title="Saldo Total"
          value="R$ 45.231,89"
          icon={<DollarSign className="h-4 w-4" />}
          trend="+20,1% em relação ao mês anterior"
        />
        <DashboardCard
          title="Investimentos"
          value="R$ 21.345,67"
          icon={<PiggyBank className="h-4 w-4" />}
          trend="+12,3% em relação ao mês anterior"
        />
        <DashboardCard
          title="Dívidas"
          value="R$ 5.678,90"
          icon={<CreditCard className="h-4 w-4" />}
          trend="-3,2% em relação ao mês anterior"
        />
        <DashboardCard
          title="Gerenciamento Compartilhado"
          value="2"
          icon={<Users className="h-4 w-4" />}
          trend="Gerenciamentos compartilhados ativos"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Receitas vs Despesas</CardTitle>
            <CardDescription>Visão geral financeira mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="receita" stroke="#22c55e" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="despesas" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Gerencie suas finanças</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <QuickActionButton
              href="/gerenciamento-pessoal"
              icon={<BarChart className="mr-2 h-4 w-4" />}
              label="Gerenciamento Pessoal"
            />
            <QuickActionButton
              href="/gerenciamento-compartilhado"
              icon={<Users className="mr-2 h-4 w-4" />}
              label="Gerenciamento Compartilhado"
            />
            <QuickActionButton
              href="/carteira-investimentos"
              icon={<PiggyBank className="mr-2 h-4 w-4" />}
              label="Investimentos"
            />
            <QuickActionButton href="/metas" icon={<Target className="mr-2 h-4 w-4" />} label="Metas" />
            <QuickActionButton href="/dividas" icon={<CreditCard className="mr-2 h-4 w-4" />} label="Dívidas" />
            <QuickActionButton
              href="/calculadoras"
              icon={<Calculator className="mr-2 h-4 w-4" />}
              label="Calculadoras"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
