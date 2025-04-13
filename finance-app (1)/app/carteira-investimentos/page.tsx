"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Renda Fixa", value: 40 },
  { name: "Fundos de Investimento", value: 30 },
  { name: "Fundos Imobiliários", value: 20 },
  { name: "Ações", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function CarteiraInvestimentosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Carteira de Investimentos</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Visão Geral da Carteira</CardTitle>
          <CardDescription>Sua alocação atual de investimentos</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Tabs defaultValue="renda-fixa">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="renda-fixa">Renda Fixa</TabsTrigger>
          <TabsTrigger value="fundos-investimento">Fundos de Investimento</TabsTrigger>
          <TabsTrigger value="fundos-imobiliarios">Fundos Imobiliários</TabsTrigger>
          <TabsTrigger value="acoes">Ações</TabsTrigger>
        </TabsList>
        <TabsContent value="renda-fixa">
          <Card>
            <CardHeader>
              <CardTitle>Renda Fixa</CardTitle>
              <CardDescription>Seus investimentos em renda fixa</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Tesouro Direto: R$ 10.000</li>
                <li>CDBs: R$ 5.000</li>
                <li>LCIs: R$ 3.000</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="fundos-investimento">
          <Card>
            <CardHeader>
              <CardTitle>Fundos de Investimento</CardTitle>
              <CardDescription>Seus fundos de investimento</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Fundo de Ações Global: R$ 7.000</li>
                <li>Fundo Setor de Tecnologia: R$ 4.000</li>
                <li>Fundo Mercados Emergentes: R$ 2.000</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="fundos-imobiliarios">
          <Card>
            <CardHeader>
              <CardTitle>Fundos Imobiliários</CardTitle>
              <CardDescription>Seus investimentos em fundos imobiliários</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>FII Residencial: R$ 3.000</li>
                <li>FII Comercial: R$ 2.000</li>
                <li>FII Industrial: R$ 1.000</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="acoes">
          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
              <CardDescription>Suas ações individuais</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Empresa de Tecnologia A: 10 ações, R$ 1.500</li>
                <li>Banco B: 20 ações, R$ 1.000</li>
                <li>Empresa de Varejo C: 15 ações, R$ 750</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
