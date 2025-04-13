"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Membro {
  id: string
  nome: string
  avatar?: string
  iniciais: string
}

interface DespesaCompartilhada {
  id: string
  grupo: "familia" | "colegas"
  nome: string
  valor: number
  pagoPor: string
  data: string
  divisao: "igual" | "personalizada"
  cotas?: Record<string, number>
}

export default function GerenciamentoCompartilhadoPage() {
  const [membrosFamilia] = useState<Membro[]>([
    { id: "1", nome: "João Silva", iniciais: "JS" },
    { id: "2", nome: "Maria Silva", iniciais: "MS" },
    { id: "3", nome: "Pedro Silva", iniciais: "PS" },
  ])

  const [membrosColegas] = useState<Membro[]>([
    { id: "4", nome: "Alice", iniciais: "A" },
    { id: "5", nome: "Bruno", iniciais: "B" },
    { id: "6", nome: "Carlos", iniciais: "C" },
  ])

  const [despesas, setDespesas] = useState<DespesaCompartilhada[]>([
    {
      id: "1",
      grupo: "familia",
      nome: "Supermercado",
      valor: 120,
      pagoPor: "1",
      data: "2023-10-15",
      divisao: "igual",
    },
    {
      id: "2",
      grupo: "familia",
      nome: "Contas",
      valor: 80,
      pagoPor: "2",
      data: "2023-10-10",
      divisao: "igual",
    },
    {
      id: "3",
      grupo: "colegas",
      nome: "Aluguel",
      valor: 1200,
      pagoPor: "4",
      data: "2023-10-01",
      divisao: "igual",
    },
    {
      id: "4",
      grupo: "colegas",
      nome: "Internet",
      valor: 60,
      pagoPor: "5",
      data: "2023-10-05",
      divisao: "igual",
    },
  ])

  const [novaDespesa, setNovaDespesa] = useState<{
    grupo: "familia" | "colegas"
    nome: string
    valor: string
    pagoPor: string
    data: string
    divisao: "igual" | "personalizada"
  }>({
    grupo: "familia",
    nome: "",
    valor: "",
    pagoPor: "",
    data: new Date().toISOString().split("T")[0],
    divisao: "igual",
  })

  const handleAdicionarDespesa = (grupo: "familia" | "colegas") => {
    if (novaDespesa.nome && novaDespesa.valor && novaDespesa.pagoPor && novaDespesa.data) {
      const despesa: DespesaCompartilhada = {
        id: Date.now().toString(),
        grupo,
        nome: novaDespesa.nome,
        valor: Number.parseFloat(novaDespesa.valor),
        pagoPor: novaDespesa.pagoPor,
        data: novaDespesa.data,
        divisao: novaDespesa.divisao,
      }

      setDespesas([...despesas, despesa])
      setNovaDespesa({
        grupo,
        nome: "",
        valor: "",
        pagoPor: "",
        data: new Date().toISOString().split("T")[0],
        divisao: "igual",
      })
    }
  }

  const getNomeMembro = (id: string) => {
    const todosMembros = [...membrosFamilia, ...membrosColegas]
    const membro = todosMembros.find((m) => m.id === id)
    return membro ? membro.nome : "Desconhecido"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Gerenciamento Compartilhado</h1>
      <Tabs defaultValue="familia">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="familia">Orçamento Familiar</TabsTrigger>
          <TabsTrigger value="colegas">Despesas com Colegas</TabsTrigger>
        </TabsList>
        <TabsContent value="familia">
          <Card>
            <CardHeader>
              <CardTitle>Orçamento Familiar</CardTitle>
              <CardDescription>Gerencie despesas familiares compartilhadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Membros</h3>
                <div className="flex space-x-2">
                  {membrosFamilia.map((membro) => (
                    <Avatar key={membro.id}>
                      <AvatarImage src={membro.avatar || `/placeholder.svg?height=32&width=32`} alt={membro.nome} />
                      <AvatarFallback>{membro.iniciais}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAdicionarDespesa("familia")
                }}
                className="space-y-4"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="despesa-nome">Nome da Despesa</Label>
                    <Input
                      id="despesa-nome"
                      placeholder="ex., Supermercado, Contas"
                      value={novaDespesa.nome}
                      onChange={(e) => setNovaDespesa({ ...novaDespesa, nome: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="despesa-valor">Valor</Label>
                    <Input
                      id="despesa-valor"
                      type="number"
                      placeholder="0,00"
                      value={novaDespesa.valor}
                      onChange={(e) => setNovaDespesa({ ...novaDespesa, valor: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="despesa-pago-por">Pago Por</Label>
                    <Select
                      value={novaDespesa.pagoPor}
                      onValueChange={(value) => setNovaDespesa({ ...novaDespesa, pagoPor: value })}
                    >
                      <SelectTrigger id="despesa-pago-por">
                        <SelectValue placeholder="Selecione o membro" />
                      </SelectTrigger>
                      <SelectContent>
                        {membrosFamilia.map((membro) => (
                          <SelectItem key={membro.id} value={membro.id}>
                            {membro.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="despesa-data">Data</Label>
                    <Input
                      id="despesa-data"
                      type="date"
                      value={novaDespesa.data}
                      onChange={(e) => setNovaDespesa({ ...novaDespesa, data: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit">Adicionar Despesa Compartilhada</Button>
              </form>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Despesas Familiares Recentes</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Despesa</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Pago Por</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {despesas
                      .filter((e) => e.grupo === "familia")
                      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                      .map((despesa) => (
                        <TableRow key={despesa.id}>
                          <TableCell>{despesa.nome}</TableCell>
                          <TableCell>R$ {despesa.valor.toLocaleString()}</TableCell>
                          <TableCell>{getNomeMembro(despesa.pagoPor)}</TableCell>
                          <TableCell>{new Date(despesa.data).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="colegas">
          <Card>
            <CardHeader>
              <CardTitle>Despesas com Colegas</CardTitle>
              <CardDescription>Gerencie despesas compartilhadas com colegas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Colegas</h3>
                <div className="flex space-x-2">
                  {membrosColegas.map((membro) => (
                    <Avatar key={membro.id}>
                      <AvatarImage src={membro.avatar || `/placeholder.svg?height=32&width=32`} alt={membro.nome} />
                      <AvatarFallback>{membro.iniciais}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAdicionarDespesa("colegas")
                }}
                className="space-y-4"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="colega-despesa-nome">Nome da Despesa</Label>
                    <Input
                      id="colega-despesa-nome"
                      placeholder="ex., Aluguel, Internet"
                      value={novaDespesa.nome}
                      onChange={(e) => setNovaDespesa({ ...novaDespesa, nome: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="colega-despesa-valor">Valor</Label>
                    <Input
                      id="colega-despesa-valor"
                      type="number"
                      placeholder="0,00"
                      value={novaDespesa.valor}
                      onChange={(e) => setNovaDespesa({ ...novaDespesa, valor: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="colega-despesa-pago-por">Pago Por</Label>
                    <Select
                      value={novaDespesa.pagoPor}
                      onValueChange={(value) => setNovaDespesa({ ...novaDespesa, pagoPor: value })}
                    >
                      <SelectTrigger id="colega-despesa-pago-por">
                        <SelectValue placeholder="Selecione o colega" />
                      </SelectTrigger>
                      <SelectContent>
                        {membrosColegas.map((membro) => (
                          <SelectItem key={membro.id} value={membro.id}>
                            {membro.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="colega-despesa-data">Data</Label>
                    <Input
                      id="colega-despesa-data"
                      type="date"
                      value={novaDespesa.data}
                      onChange={(e) => setNovaDespesa({ ...novaDespesa, data: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit">Adicionar Despesa Compartilhada</Button>
              </form>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Despesas Recentes com Colegas</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Despesa</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Pago Por</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {despesas
                      .filter((e) => e.grupo === "colegas")
                      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                      .map((despesa) => (
                        <TableRow key={despesa.id}>
                          <TableCell>{despesa.nome}</TableCell>
                          <TableCell>R$ {despesa.valor.toLocaleString()}</TableCell>
                          <TableCell>{getNomeMembro(despesa.pagoPor)}</TableCell>
                          <TableCell>{new Date(despesa.data).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
