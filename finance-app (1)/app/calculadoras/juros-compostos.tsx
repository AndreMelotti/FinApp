"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CalculadoraJurosCompostos() {
  const [principal, setPrincipal] = useState(1000)
  const [taxa, setTaxa] = useState(5)
  const [tempo, setTempo] = useState(10)
  const [composto, setComposto] = useState(12)
  const [resultado, setResultado] = useState<{
    valorFinal: string
    jurosTotal: string
    anos: Array<{
      ano: number
      valor: string
      juros: string
    }>
  } | null>(null)

  const calcularJurosCompostos = () => {
    const n = Number(composto)
    const t = Number(tempo)
    const r = Number(taxa) / 100
    const P = Number(principal)

    const valor = P * Math.pow(1 + r / n, n * t)
    const juros = valor - P

    setResultado({
      valorFinal: valor.toFixed(2),
      jurosTotal: juros.toFixed(2),
      anos: Array.from({ length: t }, (_, i) => {
        const ano = i + 1
        const valorAnual = P * Math.pow(1 + r / n, n * ano)
        return {
          ano,
          valor: valorAnual.toFixed(2),
          juros: (valorAnual - P).toFixed(2),
        }
      }),
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calculadora</CardTitle>
          <CardDescription>Insira os detalhes do seu investimento</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              calcularJurosCompostos()
            }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="principal">Investimento Inicial</Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taxa">Taxa de Juros Anual (%)</Label>
              <Input id="taxa" type="number" value={taxa} onChange={(e) => setTaxa(Number(e.target.value))} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tempo">Período (Anos)</Label>
              <Input id="tempo" type="number" value={tempo} onChange={(e) => setTempo(Number(e.target.value))} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="composto">Frequência de Capitalização</Label>
              <Select value={composto.toString()} onValueChange={(value) => setComposto(Number(value))}>
                <SelectTrigger id="composto">
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Anual</SelectItem>
                  <SelectItem value="2">Semestral</SelectItem>
                  <SelectItem value="4">Trimestral</SelectItem>
                  <SelectItem value="12">Mensal</SelectItem>
                  <SelectItem value="365">Diária</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={calcularJurosCompostos}>
            Calcular
          </Button>
        </CardFooter>
      </Card>
      {resultado && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
            <CardDescription>Resultados do cálculo de juros compostos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Valor Final</h3>
                <p className="text-2xl font-bold">R$ {resultado.valorFinal}</p>
              </div>
              <div>
                <h3 className="font-semibold">Total de Juros Ganhos</h3>
                <p className="text-2xl font-bold">R$ {resultado.jurosTotal}</p>
              </div>
              <div className="max-h-[300px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ano</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Juros</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultado.anos.map((ano) => (
                      <TableRow key={ano.ano}>
                        <TableCell>{ano.ano}</TableCell>
                        <TableCell>R$ {ano.valor}</TableCell>
                        <TableCell>R$ {ano.juros}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
