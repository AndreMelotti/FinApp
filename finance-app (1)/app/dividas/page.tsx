"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Divida {
  id: string
  nome: string
  valor: number
  juros: number
  dataVencimento: string
}

export default function DividasPage() {
  const [dividas, setDividas] = useState<Divida[]>([
    { id: "1", nome: "Financiamento Imobiliário", valor: 200000, juros: 3.5, dataVencimento: "2023-10-15" },
    { id: "2", nome: "Financiamento de Veículo", valor: 15000, juros: 4.2, dataVencimento: "2023-10-20" },
    { id: "3", nome: "Cartão de Crédito", valor: 3000, juros: 18.9, dataVencimento: "2023-10-25" },
  ])

  const [novaDivida, setNovaDivida] = useState({
    nome: "",
    valor: "",
    juros: "",
    dataVencimento: "",
  })

  const totalDividas = dividas.reduce((sum, divida) => sum + divida.valor, 0)
  const rendaAnual = 83000 // Exemplo de renda anual
  const relacaoDividaRenda = (totalDividas / rendaAnual) * 100

  const handleAdicionarDivida = () => {
    if (novaDivida.nome && novaDivida.valor && novaDivida.juros && novaDivida.dataVencimento) {
      const divida: Divida = {
        id: Date.now().toString(),
        nome: novaDivida.nome,
        valor: Number.parseFloat(novaDivida.valor),
        juros: Number.parseFloat(novaDivida.juros),
        dataVencimento: novaDivida.dataVencimento,
      }

      setDividas([...dividas, divida])
      setNovaDivida({ nome: "", valor: "", juros: "", dataVencimento: "" })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Gerenciamento de Dívidas</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Nova Dívida</CardTitle>
            <CardDescription>Registre uma nova dívida ou empréstimo</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAdicionarDivida()
              }}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="divida-nome">Nome da Dívida</Label>
                  <Input
                    id="divida-nome"
                    placeholder="ex., Financiamento de Veículo"
                    value={novaDivida.nome}
                    onChange={(e) => setNovaDivida({ ...novaDivida, nome: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="divida-valor">Valor Total</Label>
                  <Input
                    id="divida-valor"
                    type="number"
                    placeholder="0,00"
                    value={novaDivida.valor}
                    onChange={(e) => setNovaDivida({ ...novaDivida, valor: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="divida-juros">Taxa de Juros (%)</Label>
                  <Input
                    id="divida-juros"
                    type="number"
                    placeholder="0,00"
                    step="0.1"
                    value={novaDivida.juros}
                    onChange={(e) => setNovaDivida({ ...novaDivida, juros: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="divida-data">Data de Vencimento</Label>
                  <Input
                    id="divida-data"
                    type="date"
                    value={novaDivida.dataVencimento}
                    onChange={(e) => setNovaDivida({ ...novaDivida, dataVencimento: e.target.value })}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleAdicionarDivida}>
              Adicionar Dívida
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral das Dívidas</CardTitle>
            <CardDescription>Resumo das suas dívidas atuais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between">
                  <h3 className="font-semibold">Total de Dívidas</h3>
                  <span>R$ {totalDividas.toLocaleString()}</span>
                </div>
                <Progress value={Math.min(relacaoDividaRenda, 100)} className="mt-2" />
                <p className="text-sm text-muted-foreground">{relacaoDividaRenda.toFixed(1)}% da renda anual</p>
              </div>
              <div className="max-h-[300px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dívida</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Juros</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dividas.map((divida) => (
                      <TableRow key={divida.id}>
                        <TableCell>{divida.nome}</TableCell>
                        <TableCell>R$ {divida.valor.toLocaleString()}</TableCell>
                        <TableCell>{divida.juros}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
