"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompoundInterestCalculator } from "./compound-interest"
import { LoanPaymentCalculator } from "./loan-payment"

export default function CalculatorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Financial Calculators</h1>
      <Tabs defaultValue="compound-interest">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="compound-interest">Compound Interest</TabsTrigger>
          <TabsTrigger value="loan-payment">Loan Payment</TabsTrigger>
        </TabsList>
        <TabsContent value="compound-interest">
          <CompoundInterestCalculator />
        </TabsContent>
        <TabsContent value="loan-payment">
          <LoanPaymentCalculator />
        </TabsContent>
      </Tabs>
    </div>
  )
}
