"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

interface Meta {
  id: string
  nome: string
  descricao: string
  valorAlvo: number
  valorAtual: number
  dataAlvo: string
}

export default function MetasPage() {
  const [metas, setMetas] = useState<Meta[]>([
    {
      id: "1",
      nome: "Comprar uma casa",
      descricao: "Economizar para entrada",
      valorAlvo: 200000,
      valorAtual: 50000,
      dataAlvo: "2026-12-31",
    },
    {
      id: "2",
      nome: "Carro Novo",
      descricao: "Economizar para um carro novo",
      valorAlvo: 30000,
      valorAtual: 15000,
      dataAlvo: "2024-06-30",
    },
    {
      id: "3",
      nome: "Fundo de Emergência",
      descricao: "6 meses de despesas",
      valorAlvo: 10000,
      valorAtual: 5000,
      dataAlvo: "2023-12-31",
    },
  ])

  const [novaMeta, setNovaMeta] = useState({
    nome: "",
    descricao: "",
    valorAlvo: "",
    dataAlvo: "",
  })

  const handleAdicionarMeta = () => {
    if (novaMeta.nome && novaMeta.valorAlvo && novaMeta.dataAlvo) {
      const meta: Meta = {
        id: Date.now().toString(),
        nome: novaMeta.nome,
        descricao: novaMeta.descricao,
        valorAlvo: Number.parseFloat(novaMeta.valorAlvo),
        valorAtual: 0,
        dataAlvo: novaMeta.dataAlvo,
      }

      setMetas([...metas, meta])
      setNovaMeta({ nome: "", descricao: "", valorAlvo: "", dataAlvo: "" })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Metas Financeiras</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Nova Meta</CardTitle>
            <CardDescription>Crie uma nova meta financeira</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAdicionarMeta()
              }}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="meta-nome">Nome da Meta</Label>
                  <Input
                    id="meta-nome"
                    placeholder="ex., Comprar uma casa"
                    value={novaMeta.nome}
                    onChange={(e) => setNovaMeta({ ...novaMeta, nome: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="meta-descricao">Descrição</Label>
                  <Input
                    id="meta-descricao"
                    placeholder="Breve descrição da sua meta"
                    value={novaMeta.descricao}
                    onChange={(e) => setNovaMeta({ ...novaMeta, descricao: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="meta-valor">Valor Alvo</Label>
                  <Input
                    id="meta-valor"
                    type="number"
                    placeholder="0,00"
                    value={novaMeta.valorAlvo}
                    onChange={(e) => setNovaMeta({ ...novaMeta, valorAlvo: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="meta-data">Data Alvo</Label>
                  <Input
                    id="meta-data"
                    type="date"
                    value={novaMeta.dataAlvo}
                    onChange={(e) => setNovaMeta({ ...novaMeta, dataAlvo: e.target.value })}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleAdicionarMeta}>
              Criar Meta
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Metas Atuais</CardTitle>
            <CardDescription>Acompanhe seu progresso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {metas.map((meta) => {
                const progresso = (meta.valorAtual / meta.valorAlvo) * 100
                return (
                  <div key={meta.id}>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{meta.nome}</h3>
                        <p className="text-sm text-muted-foreground">{meta.descricao}</p>
                      </div>
                      <span>
                        R$ {meta.valorAtual.toLocaleString()} / R$ {meta.valorAlvo.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progresso} className="mt-2" />
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>{progresso.toFixed(0)}% completo</span>
                      <span>Meta: {new Date(meta.dataAlvo).toLocaleDateString()}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
