"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalculadoraJurosCompostos } from "./juros-compostos"
import { CalculadoraPagamentoEmprestimo } from "./pagamento-emprestimo"

export default function CalculadorasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Calculadoras Financeiras</h1>
      <Tabs defaultValue="juros-compostos">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="juros-compostos">Juros Compostos</TabsTrigger>
          <TabsTrigger value="pagamento-emprestimo">Pagamento de Empréstimo</TabsTrigger>
        </TabsList>
        <TabsContent value="juros-compostos">
          <CalculadoraJurosCompostos />
        </TabsContent>
        <TabsContent value="pagamento-emprestimo">
          <CalculadoraPagamentoEmprestimo />
        </TabsContent>
      </Tabs>
    </div>
  )
}
