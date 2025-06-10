"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import Card from "../components/Card"
import Button from "../components/Button"
import CustomInput from "../components/CustomInput"
import CustomSelect from "../components/CustomSelect"
import CustomTable from "../components/CustomTable"
import CustomTabs from "../components/CustomTabs"
import { useTheme } from "../context/ThemeContext"

// Compound Interest Calculator Component
function CalculadoraJurosCompostos() {
  const [principal, setPrincipal] = useState("1000")
  const [taxa, setTaxa] = useState("5")
  const [tempo, setTempo] = useState("10")
  const [composto, setComposto] = useState("12")
  const [resultado, setResultado] = useState<{
    valorFinal: string
    jurosTotal: string
    anos: Array<{
      ano: number
      valor: string
      juros: string
    }>
  } | null>(null)
  const { theme } = useTheme()

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

  const formatCurrency = (value: string) => {
    return `R$ ${value}`
  }

  const frequencyOptions = [
    { label: "Anual", value: "1" },
    { label: "Semestral", value: "2" },
    { label: "Trimestral", value: "4" },
    { label: "Mensal", value: "12" },
    { label: "Diária", value: "365" },
  ]

  const tableColumns = [
    { key: "ano", title: "Ano" },
    { key: "valor", title: "Valor" },
    { key: "juros", title: "Juros" },
  ]

  const tableData =
    resultado?.anos.map((ano) => ({
      ano: ano.ano.toString(),
      valor: formatCurrency(ano.valor),
      juros: formatCurrency(ano.juros),
    })) || []

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.calculatorGrid}>
        <Card style={styles.inputCard}>
          <Text style={[styles.cardTitle, { color: theme.cardForeground }]}>Calculadora</Text>
          <Text style={[styles.cardDescription, { color: theme.mutedForeground }]}>
            Insira os detalhes do seu investimento
          </Text>

          <View style={styles.form}>
            <CustomInput
              label="Investimento Inicial"
              value={principal}
              onChangeText={setPrincipal}
              keyboardType="numeric"
            />
            <CustomInput label="Taxa de Juros Anual (%)" value={taxa} onChangeText={setTaxa} keyboardType="numeric" />
            <CustomInput label="Período (Anos)" value={tempo} onChangeText={setTempo} keyboardType="numeric" />
            <CustomSelect
              label="Frequência de Capitalização"
              value={composto}
              onValueChange={setComposto}
              options={frequencyOptions}
            />
          </View>

          <Button title="Calcular" onPress={calcularJurosCompostos} style={styles.calculateButton} />
        </Card>

        {resultado && (
          <Card style={styles.resultCard}>
            <Text style={[styles.cardTitle, { color: theme.cardForeground }]}>Resultados</Text>
            <Text style={[styles.cardDescription, { color: theme.mutedForeground }]}>
              Resultados do cálculo de juros compostos
            </Text>

            <View style={styles.resultSection}>
              <View style={styles.resultItem}>
                <Text style={[styles.resultLabel, { color: theme.foreground }]}>Valor Final</Text>
                <Text style={[styles.resultValue, { color: theme.foreground }]}>
                  {formatCurrency(resultado.valorFinal)}
                </Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={[styles.resultLabel, { color: theme.foreground }]}>Total de Juros Ganhos</Text>
                <Text style={[styles.resultValue, { color: theme.foreground }]}>
                  {formatCurrency(resultado.jurosTotal)}
                </Text>
              </View>
            </View>

            <View style={styles.tableContainer}>
              <CustomTable columns={tableColumns} data={tableData} />
            </View>
          </Card>
        )}
      </View>
    </ScrollView>
  )
}

// Loan Payment Calculator Component
function CalculadoraPagamentoEmprestimo() {
  const [valorEmprestimo, setValorEmprestimo] = useState("100000")
  const [prazoEmprestimo, setPrazoEmprestimo] = useState("30")
  const [taxaJuros, setTaxaJuros] = useState("4.5")
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
  const { theme } = useTheme()

  const calcularPagamentoEmprestimo = () => {
    const P = Number(valorEmprestimo)
    const r = Number(taxaJuros) / 100 / 12
    const n = Number(prazoEmprestimo) * 12

    const pagamentoMensal = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
    const pagamentoTotal = pagamentoMensal * n
    const jurosTotal = pagamentoTotal - P

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

  const formatCurrency = (value: string) => {
    return `R$ ${value}`
  }

  const tableColumns = [
    { key: "ano", title: "Ano" },
    { key: "pagamento", title: "Pagamento" },
    { key: "juros", title: "Juros" },
    { key: "saldo", title: "Saldo" },
  ]

  const tableData =
    resultado?.tabelaAmortizacao.map((linha) => ({
      ano: linha.ano.toString(),
      pagamento: formatCurrency(linha.pagamento),
      juros: formatCurrency(linha.juros),
      saldo: formatCurrency(linha.saldo),
    })) || []

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.calculatorGrid}>
        <Card style={styles.inputCard}>
          <Text style={[styles.cardTitle, { color: theme.cardForeground }]}>Calculadora de Empréstimo</Text>
          <Text style={[styles.cardDescription, { color: theme.mutedForeground }]}>
            Calcule suas parcelas mensais de empréstimo
          </Text>

          <View style={styles.form}>
            <CustomInput
              label="Valor do Empréstimo"
              value={valorEmprestimo}
              onChangeText={setValorEmprestimo}
              keyboardType="numeric"
            />
            <CustomInput
              label="Prazo do Empréstimo (Anos)"
              value={prazoEmprestimo}
              onChangeText={setPrazoEmprestimo}
              keyboardType="numeric"
            />
            <CustomInput
              label="Taxa de Juros Anual (%)"
              value={taxaJuros}
              onChangeText={setTaxaJuros}
              keyboardType="numeric"
            />
          </View>

          <Button title="Calcular" onPress={calcularPagamentoEmprestimo} style={styles.calculateButton} />
        </Card>

        {resultado && (
          <Card style={styles.resultCard}>
            <Text style={[styles.cardTitle, { color: theme.cardForeground }]}>Resultados</Text>
            <Text style={[styles.cardDescription, { color: theme.mutedForeground }]}>
              Resultados do cálculo de pagamento de empréstimo
            </Text>

            <View style={styles.resultSection}>
              <View style={styles.resultItem}>
                <Text style={[styles.resultLabel, { color: theme.foreground }]}>Pagamento Mensal</Text>
                <Text style={[styles.resultValue, { color: theme.foreground }]}>
                  {formatCurrency(resultado.pagamentoMensal)}
                </Text>
              </View>
              <View style={styles.resultGrid}>
                <View style={styles.resultGridItem}>
                  <Text style={[styles.resultLabel, { color: theme.foreground }]}>Pagamento Total</Text>
                  <Text style={[styles.resultValueSmall, { color: theme.foreground }]}>
                    {formatCurrency(resultado.pagamentoTotal)}
                  </Text>
                </View>
                <View style={styles.resultGridItem}>
                  <Text style={[styles.resultLabel, { color: theme.foreground }]}>Total de Juros</Text>
                  <Text style={[styles.resultValueSmall, { color: theme.foreground }]}>
                    {formatCurrency(resultado.jurosTotal)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.tableContainer}>
              <CustomTable columns={tableColumns} data={tableData} />
            </View>
          </Card>
        )}
      </View>
    </ScrollView>
  )
}

export default function CalculadorasScreen({ navigation }: any) {
  const { theme, isDark } = useTheme()

  const gradientColors: [string, string] = isDark ? ["#082f49", "#042f2e"] : ["#dbeafe", "#ccfbf1"]

  const tabs = [
    {
      id: "juros-compostos",
      label: "Juros Compostos",
      content: <CalculadoraJurosCompostos />,
    },
    {
      id: "pagamento-emprestimo",
      label: "Empréstimo",
      content: <CalculadoraPagamentoEmprestimo />,
    },
  ]

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <LinearGradient colors={gradientColors} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Button
              title=""
              onPress={() => navigation.goBack()}
              style={[styles.backButton, { backgroundColor: theme.card }]}
            >
              <Ionicons name="arrow-back" size={24} color={theme.foreground} />
            </Button>
            <Text style={[styles.title, { color: theme.foreground }]}>Calculadoras Financeiras</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <CustomTabs tabs={tabs} defaultTab="juros-compostos" />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  calculatorGrid: {
    gap: 16,
  },
  inputCard: {
    padding: 16,
  },
  resultCard: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  form: {
    marginBottom: 16,
  },
  calculateButton: {
    marginTop: 8,
  },
  resultSection: {
    marginBottom: 16,
  },
  resultItem: {
    marginBottom: 16,
  },
  resultGrid: {
    flexDirection: "row",
    gap: 16,
  },
  resultGridItem: {
    flex: 1,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  resultValueSmall: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tableContainer: {
    marginTop: 16,
  },
})
