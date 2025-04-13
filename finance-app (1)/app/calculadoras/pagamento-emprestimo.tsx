"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CalculadoraPagamentoEmprestimo() {
  const [valorEmprestimo, setValorEmprestimo] = useState(100000)
  const [prazoEmprestimo, setPrazoEmprestimo] = useState(30)
  const [taxaJuros, setTaxaJuros] = useState(4.5)
  const [resultado, setResultado] = useState<{
    pagamentoMensal: string
    pagamentoTotal: string
    jurosTotal: string
    tabelaAmortizacao: Array<{
      ano: number
      pagamento: string
      principal: string
      juros: string
      saldo: string
    }>
  } | null>(null)

  const calcularPagamentoEmprestimo = () => {
    const P = Number(valorEmprestimo)
    const r = Number(taxaJuros) / 100 / 12
    const n = Number(prazoEmprestimo) * 12

    // Fórmula de pagamento mensal: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    const pagamentoMensal = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
    const pagamentoTotal = pagamentoMensal * n
    const jurosTotal = pagamentoTotal - P

    // Gerar tabela de amortização anual
    let saldoRestante = P
    const dadosAnuais = []

    for (let ano = 1; ano <= Number(prazoEmprestimo); ano++) {
      let principalAnual = 0
      let jurosAnual = 0

      for (let mes = 1; mes <= 12; mes++) {
        const jurosMensal = saldoRestante * r
        const principalMensal = pagamentoMensal - jurosMensal

        principalAnual += principalMensal
        jurosAnual += jurosMensal
        saldoRestante -= principalMensal
      }

      dadosAnuais.push({
        ano,
        pagamento: (principalAnual + jurosAnual).toFixed(2),
        principal: principalAnual.toFixed(2),
        juros: jurosAnual.toFixed(2),
        saldo: saldoRestante > 0 ? saldoRestante.toFixed(2) : "0.00",
      })
    }

    setResultado({
      pagamentoMensal: pagamentoMensal.toFixed(2),
      pagamentoTotal: pagamentoTotal.toFixed(2),
      jurosTotal: jurosTotal.toFixed(2),
      tabelaAmortizacao: dadosAnuais,
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Empréstimo</CardTitle>
          <CardDescription>Calcule suas parcelas mensais de empréstimo</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              calcularPagamentoEmprestimo()
            }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="valor-emprestimo">Valor do Empréstimo</Label>
              <Input
                id="valor-emprestimo"
                type="number"
                value={valorEmprestimo}
                onChange={(e) => setValorEmprestimo(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="prazo-emprestimo">Prazo do Empréstimo (Anos)</Label>
              <Input
                id="prazo-emprestimo"
                type="number"
                value={prazoEmprestimo}
                onChange={(e) => setPrazoEmprestimo(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taxa-juros">Taxa de Juros Anual (%)</Label>
              <Input
                id="taxa-juros"
                type="number"
                value={taxaJuros}
                step="0.1"
                onChange={(e) => setTaxaJuros(Number(e.target.value))}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={calcularPagamentoEmprestimo}>
            Calcular
          </Button>
        </CardFooter>
      </Card>
      {resultado && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
            <CardDescription>Resultados do cálculo de pagamento de empréstimo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Pagamento Mensal</h3>
                <p className="text-2xl font-bold">R$ {resultado.pagamentoMensal}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Pagamento Total</h3>
                  <p className="text-xl font-bold">R$ {resultado.pagamentoTotal}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Total de Juros</h3>
                  <p className="text-xl font-bold">R$ {resultado.jurosTotal}</p>
                </div>
              </div>
              <div className="max-h-[300px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ano</TableHead>
                      <TableHead>Pagamento</TableHead>
                      <TableHead>Juros</TableHead>
                      <TableHead>Saldo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultado.tabelaAmortizacao.map((linha) => (
                      <TableRow key={linha.ano}>
                        <TableCell>{linha.ano}</TableCell>
                        <TableCell>R$ {linha.pagamento}</TableCell>
                        <TableCell>R$ {linha.juros}</TableCell>
                        <TableCell>R$ {linha.saldo}</TableCell>
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
