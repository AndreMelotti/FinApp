"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const dadosReceitas = [
  { categoria: "Salário", valor: 4000, porcentagem: "75,5%" },
  { categoria: "Freelance", valor: 1000, porcentagem: "18,9%" },
  { categoria: "Investimentos", valor: 300, porcentagem: "5,6%" },
]

const dadosDespesas = [
  { categoria: "Moradia", valor: 1500, porcentagem: "30,0%" },
  { categoria: "Alimentação", valor: 750, porcentagem: "15,0%" },
  { categoria: "Transporte", valor: 500, porcentagem: "10,0%" },
  { categoria: "Serviços", valor: 400, porcentagem: "8,0%" },
  { categoria: "Entretenimento", valor: 300, porcentagem: "6,0%" },
  { categoria: "Saúde", valor: 250, porcentagem: "5,0%" },
  { categoria: "Compras", valor: 400, porcentagem: "8,0%" },
  { categoria: "Poupança", valor: 900, porcentagem: "18,0%" },
]

const dadosInvestimentos = [
  { categoria: "Ações", valor: 10000, retorno: "8,5%" },
  { categoria: "Títulos", valor: 5000, retorno: "3,2%" },
  { categoria: "Fundos Imobiliários", valor: 7000, retorno: "6,8%" },
  { categoria: "Fundos de Investimento", valor: 8000, retorno: "7,1%" },
]

const dadosDividas = [
  { tipo: "Financiamento Imobiliário", valor: 200000, juros: "3,5%", pagamento: 1200 },
  { tipo: "Financiamento de Veículo", valor: 15000, juros: "4,2%", pagamento: 300 },
  { tipo: "Cartão de Crédito", valor: 3000, juros: "18,9%", pagamento: 150 },
  { tipo: "Empréstimo Estudantil", valor: 20000, juros: "5,5%", pagamento: 250 },
]

const dadosDespesasMensais = [
  { nome: "Jan", valor: 2400 },
  { nome: "Fev", valor: 1398 },
  { nome: "Mar", valor: 9800 },
  { nome: "Abr", valor: 3908 },
  { nome: "Mai", valor: 4800 },
  { nome: "Jun", valor: 3800 },
]

const dadosDespesasCategorias = [
  { nome: "Moradia", valor: 1500 },
  { nome: "Alimentação", valor: 750 },
  { nome: "Transporte", valor: 500 },
  { nome: "Serviços", valor: 400 },
  { nome: "Outros", valor: 850 },
]

const CORES = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4560"]

export default function RelatoriosPage() {
  const [tipoRelatorio, setTipoRelatorio] = useState("dashboard")
  const [periodoData, setPeriodoData] = useState("mes")

  const gerarRelatorio = () => {
    // Isso geraria um relatório para download
    alert(`Gerando relatório ${tipoRelatorio} para o período ${periodoData}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Relatórios Financeiros</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Gerar Relatório</CardTitle>
          <CardDescription>Selecione o tipo de relatório que deseja gerar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tipo de Relatório" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dashboard">Relatório Dashboard</SelectItem>
                <SelectItem value="pdf">Relatório PDF</SelectItem>
                <SelectItem value="excel">Relatório Excel</SelectItem>
              </SelectContent>
            </Select>

            <Select value={periodoData} onValueChange={setPeriodoData}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mes">Este Mês</SelectItem>
                <SelectItem value="trimestre">Este Trimestre</SelectItem>
                <SelectItem value="ano">Este Ano</SelectItem>
                <SelectItem value="personalizado">Período Personalizado</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={gerarRelatorio}>Gerar Relatório</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="receitas-despesas">
        <TabsList className="w-full grid grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="receitas-despesas">Receitas & Despesas</TabsTrigger>
          <TabsTrigger value="investimentos">Investimentos</TabsTrigger>
          <TabsTrigger value="dividas">Dívidas</TabsTrigger>
        </TabsList>

        <TabsContent value="receitas-despesas">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Relatório de Receitas & Despesas</CardTitle>
                <CardDescription>Visão geral das suas atividades financeiras</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Porcentagem</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3} className="font-bold">
                        Receitas
                      </TableCell>
                    </TableRow>
                    {dadosReceitas.map((row, i) => (
                      <TableRow key={`receita-${i}`}>
                        <TableCell>{row.categoria}</TableCell>
                        <TableCell>R$ {row.valor.toLocaleString()}</TableCell>
                        <TableCell>{row.porcentagem}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="font-bold">
                        Despesas
                      </TableCell>
                    </TableRow>
                    {dadosDespesas.map((row, i) => (
                      <TableRow key={`despesa-${i}`}>
                        <TableCell>{row.categoria}</TableCell>
                        <TableCell>R$ {row.valor.toLocaleString()}</TableCell>
                        <TableCell>{row.porcentagem}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Despesas Mensais</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={dadosDespesasMensais}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nome" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="valor" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Categorias de Despesas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={dadosDespesasCategorias}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="valor"
                      >
                        {dadosDespesasCategorias.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="investimentos">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Investimentos</CardTitle>
              <CardDescription>Resumo da sua carteira de investimentos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo de Investimento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Retorno</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosInvestimentos.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.categoria}</TableCell>
                      <TableCell>R$ {row.valor.toLocaleString()}</TableCell>
                      <TableCell>{row.retorno}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dividas">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Dívidas</CardTitle>
              <CardDescription>Visão geral das suas dívidas atuais</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo de Dívida</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Taxa de Juros</TableHead>
                    <TableHead>Pagamento Mensal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosDividas.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.tipo}</TableCell>
                      <TableCell>R$ {row.valor.toLocaleString()}</TableCell>
                      <TableCell>{row.juros}</TableCell>
                      <TableCell>R$ {row.pagamento.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
