"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Transacao {
  id: string
  tipo: "receita" | "despesa"
  categoria: string
  valor: number
  data: string
  descricao?: string
}

export default function GerenciamentoPessoalPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([
    { id: "1", tipo: "receita", categoria: "Salário", valor: 4000, data: "2023-10-01", descricao: "Salário mensal" },
    {
      id: "2",
      tipo: "receita",
      categoria: "Freelance",
      valor: 1000,
      data: "2023-10-05",
      descricao: "Projeto de website",
    },
    { id: "3", tipo: "despesa", categoria: "Moradia", valor: 1500, data: "2023-10-03", descricao: "Aluguel mensal" },
    { id: "4", tipo: "despesa", categoria: "Alimentação", valor: 400, data: "2023-10-07", descricao: "Supermercado" },
    { id: "5", tipo: "despesa", categoria: "Transporte", valor: 200, data: "2023-10-10", descricao: "Combustível" },
    {
      id: "6",
      tipo: "despesa",
      categoria: "Serviços",
      valor: 150,
      data: "2023-10-15",
      descricao: "Conta de luz",
    },
  ])

  const [novaTransacao, setNovaTransacao] = useState<{
    tipo: "receita" | "despesa"
    categoria: string
    valor: string
    data: string
    descricao: string
  }>({
    tipo: "receita",
    categoria: "",
    valor: "",
    data: new Date().toISOString().split("T")[0],
    descricao: "",
  })

  const categoriasReceitas = ["Salário", "Freelance", "Investimentos", "Presentes", "Outros"]
  const categoriasDespesas = [
    "Moradia",
    "Alimentação",
    "Transporte",
    "Serviços",
    "Entretenimento",
    "Saúde",
    "Educação",
    "Compras",
    "Dívidas",
    "Poupança",
    "Outros",
  ]

  const totalReceitas = transacoes.filter((t) => t.tipo === "receita").reduce((sum, t) => sum + t.valor, 0)

  const totalDespesas = transacoes.filter((t) => t.tipo === "despesa").reduce((sum, t) => sum + t.valor, 0)

  const saldo = totalReceitas - totalDespesas

  const handleAdicionarTransacao = (tipo: "receita" | "despesa") => {
    if (novaTransacao.categoria && novaTransacao.valor && novaTransacao.data) {
      const transacao: Transacao = {
        id: Date.now().toString(),
        tipo,
        categoria: novaTransacao.categoria,
        valor: Number.parseFloat(novaTransacao.valor),
        data: novaTransacao.data,
        descricao: novaTransacao.descricao,
      }

      setTransacoes([...transacoes, transacao])
      setNovaTransacao({
        tipo,
        categoria: "",
        valor: "",
        data: new Date().toISOString().split("T")[0],
        descricao: "",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Gerenciamento Pessoal</h1>
      <Tabs defaultValue="receitas">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="receitas">Receitas</TabsTrigger>
          <TabsTrigger value="despesas">Despesas</TabsTrigger>
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
        </TabsList>
        <TabsContent value="receitas">
          <Card>
            <CardHeader>
              <CardTitle>Receitas</CardTitle>
              <CardDescription>Gerencie suas fontes de receita</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAdicionarTransacao("receita")
                }}
                className="space-y-4"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="receita-categoria">Fonte de Receita</Label>
                    <Select
                      value={novaTransacao.categoria}
                      onValueChange={(value) => setNovaTransacao({ ...novaTransacao, categoria: value })}
                    >
                      <SelectTrigger id="receita-categoria">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriasReceitas.map((categoria) => (
                          <SelectItem key={categoria} value={categoria}>
                            {categoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="receita-valor">Valor</Label>
                    <Input
                      id="receita-valor"
                      type="number"
                      placeholder="0,00"
                      value={novaTransacao.valor}
                      onChange={(e) => setNovaTransacao({ ...novaTransacao, valor: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="receita-data">Data</Label>
                    <Input
                      id="receita-data"
                      type="date"
                      value={novaTransacao.data}
                      onChange={(e) => setNovaTransacao({ ...novaTransacao, data: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="receita-descricao">Descrição (Opcional)</Label>
                    <Input
                      id="receita-descricao"
                      placeholder="Breve descrição"
                      value={novaTransacao.descricao}
                      onChange={(e) => setNovaTransacao({ ...novaTransacao, descricao: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit">Adicionar Receita</Button>
              </form>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Receitas Recentes</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transacoes
                      .filter((t) => t.tipo === "receita")
                      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                      .slice(0, 5)
                      .map((transacao) => (
                        <TableRow key={transacao.id}>
                          <TableCell>{transacao.categoria}</TableCell>
                          <TableCell>R$ {transacao.valor.toLocaleString()}</TableCell>
                          <TableCell>{new Date(transacao.data).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="despesas">
          <Card>
            <CardHeader>
              <CardTitle>Despesas</CardTitle>
              <CardDescription>Gerencie suas despesas</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAdicionarTransacao("despesa")
                }}
                className="space-y-4"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="despesa-categoria">Categoria de Despesa</Label>
                    <Select
                      value={novaTransacao.categoria}
                      onValueChange={(value) => setNovaTransacao({ ...novaTransacao, categoria: value })}
                    >
                      <SelectTrigger id="despesa-categoria">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriasDespesas.map((categoria) => (
                          <SelectItem key={categoria} value={categoria}>
                            {categoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="despesa-valor">Valor</Label>
                    <Input
                      id="despesa-valor"
                      type="number"
                      placeholder="0,00"
                      value={novaTransacao.valor}
                      onChange={(e) => setNovaTransacao({ ...novaTransacao, valor: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="despesa-data">Data</Label>
                    <Input
                      id="despesa-data"
                      type="date"
                      value={novaTransacao.data}
                      onChange={(e) => setNovaTransacao({ ...novaTransacao, data: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="despesa-descricao">Descrição (Opcional)</Label>
                    <Input
                      id="despesa-descricao"
                      placeholder="Breve descrição"
                      value={novaTransacao.descricao}
                      onChange={(e) => setNovaTransacao({ ...novaTransacao, descricao: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit">Adicionar Despesa</Button>
              </form>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Despesas Recentes</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transacoes
                      .filter((t) => t.tipo === "despesa")
                      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                      .slice(0, 5)
                      .map((transacao) => (
                        <TableRow key={transacao.id}>
                          <TableCell>{transacao.categoria}</TableCell>
                          <TableCell>R$ {transacao.valor.toLocaleString()}</TableCell>
                          <TableCell>{new Date(transacao.data).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resumo">
          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
              <CardDescription>Visão geral das suas finanças pessoais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-600 dark:text-green-400">Total de Receitas</h3>
                    <p className="text-2xl font-bold">R$ {totalReceitas.toLocaleString()}</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-600 dark:text-red-400">Total de Despesas</h3>
                    <p className="text-2xl font-bold">R$ {totalDespesas.toLocaleString()}</p>
                  </div>
                  <div
                    className={`${saldo >= 0 ? "bg-blue-50 dark:bg-blue-950" : "bg-amber-50 dark:bg-amber-950"} p-4 rounded-lg`}
                  >
                    <h3
                      className={`font-semibold ${saldo >= 0 ? "text-blue-600 dark:text-blue-400" : "text-amber-600 dark:text-amber-400"}`}
                    >
                      Saldo
                    </h3>
                    <p className="text-2xl font-bold">R$ {saldo.toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Detalhamento de Despesas</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>% do Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoriasDespesas
                        .map((categoria) => {
                          const somaPorCategoria = transacoes
                            .filter((t) => t.tipo === "despesa" && t.categoria === categoria)
                            .reduce((sum, t) => sum + t.valor, 0)

                          const porcentagem =
                            totalDespesas > 0 ? ((somaPorCategoria / totalDespesas) * 100).toFixed(1) : "0,0"

                          return {
                            categoria,
                            valor: somaPorCategoria,
                            porcentagem,
                          }
                        })
                        .filter((c) => c.valor > 0)
                        .sort((a, b) => b.valor - a.valor)
                        .map((item) => (
                          <TableRow key={item.categoria}>
                            <TableCell>{item.categoria}</TableCell>
                            <TableCell>R$ {item.valor.toLocaleString()}</TableCell>
                            <TableCell>{item.porcentagem}%</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
