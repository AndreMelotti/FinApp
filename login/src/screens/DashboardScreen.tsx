"use client"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import Card from "../components/Card"
import { useTheme } from "../context/ThemeContext"
import { useWallet } from "../context/WalletContext"

const { width } = Dimensions.get("window")

export default function DashboardScreen({ navigation }: any) {
    const { theme, isDark } = useTheme()
    const { selectedWallet } = useWallet()

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value)
    }

    const handleQuickAction = (action: string) => {
        Alert.alert(action, "Funcionalidade em desenvolvimento")
    }

    if (!selectedWallet) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
                <View style={styles.loadingContainer}>
                    <Text style={[styles.loadingText, { color: theme.foreground }]}>Carregando...</Text>
                </View>
            </SafeAreaView>
        )
    }

    const gradientColors: [string, string] = isDark ? ["#082f49", "#042f2e"] : ["#dbeafe", "#ccfbf1"]

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
            <LinearGradient colors={gradientColors} style={styles.container}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {/* Updated Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={[styles.menuButton, { backgroundColor: theme.card }]}
                            onPress={() => {
                                console.log("Menu button pressed")
                                navigation.openDrawer()
                            }}
                        >
                            <Ionicons name="menu" size={24} color={theme.foreground} />
                        </TouchableOpacity>
                        <Text style={[styles.title, { color: theme.foreground }]}>Dashboard</Text>
                        <View style={styles.headerSpacer} />
                    </View>

                    {/* Welcome Card */}
                    <LinearGradient colors={["#2563eb", "#14b8a6"]} style={styles.welcomeCard}>
                        <View style={styles.welcomeContent}>
                            <Text style={styles.welcomeTitle}>Bem-vindo à {selectedWallet.name}</Text>
                            <Text style={styles.welcomeSubtitle}>Aqui está um resumo da sua situação financeira atual</Text>
                            <View style={styles.balanceContainer}>
                                <Ionicons name="wallet-outline" size={20} color="#ffffff" />
                                <Text style={styles.balanceText}>{formatCurrency(selectedWallet.balance)}</Text>
                            </View>
                        </View>
                    </LinearGradient>

                    {/* Summary Cards */}
                    <View style={styles.summaryContainer}>
                        {/* Income Card */}
                        <Card style={{ ...styles.summaryCard, borderLeftColor: "#22c55e", borderLeftWidth: 4 }}>
                            <View style={styles.summaryHeader}>
                                <Text style={[styles.summaryLabel, { color: theme.foreground }]}>Receitas</Text>
                                <View style={[styles.iconContainer, { backgroundColor: theme.muted }]}>
                                    <Ionicons name="trending-up" size={16} color={theme.mutedForeground} />
                                </View>
                            </View>
                            <Text style={[styles.summaryValue, { color: theme.foreground }]}>
                                {formatCurrency(selectedWallet.income)}
                            </Text>
                            <View style={styles.summaryChange}>
                                <Text style={styles.changePositive}>↑ +12% em relação ao mês anterior</Text>
                            </View>
                        </Card>

                        {/* Expenses Card */}
                        <Card style={{ ...styles.summaryCard, borderLeftColor: "#ef4444", borderLeftWidth: 4 }}>
                            <View style={styles.summaryHeader}>
                                <Text style={[styles.summaryLabel, { color: theme.foreground }]}>Despesas</Text>
                                <View style={[styles.iconContainer, { backgroundColor: theme.muted }]}>
                                    <Ionicons name="card-outline" size={16} color={theme.mutedForeground} />
                                </View>
                            </View>
                            <Text style={[styles.summaryValue, { color: theme.foreground }]}>
                                {formatCurrency(selectedWallet.expenses)}
                            </Text>
                            <View style={styles.summaryChange}>
                                <Text style={styles.changeNegative}>↓ -3% em relação ao mês anterior</Text>
                            </View>
                        </Card>

                        {/* Savings Card */}
                        <Card style={{ ...styles.summaryCard, borderLeftColor: "#3b82f6", borderLeftWidth: 4 }}>
                            <View style={styles.summaryHeader}>
                                <Text style={[styles.summaryLabel, { color: theme.foreground }]}>Economias</Text>
                                <View style={[styles.iconContainer, { backgroundColor: theme.muted }]}>
                                    <Ionicons name="wallet" size={16} color={theme.mutedForeground} />
                                </View>
                            </View>
                            <Text style={[styles.summaryValue, { color: theme.foreground }]}>
                                {formatCurrency(selectedWallet.savings)}
                            </Text>
                            <View style={styles.progressContainer}>
                                <View style={styles.progressBar}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            { width: `${Math.min(100, (selectedWallet.savings / selectedWallet.savingsGoal) * 100)}%` },
                                        ]}
                                    />
                                </View>
                                <Text style={[styles.progressText, { color: theme.mutedForeground }]}>
                                    {Math.round((selectedWallet.savings / selectedWallet.savingsGoal) * 100)}%
                                </Text>
                            </View>
                            <Text style={[styles.goalText, { color: theme.mutedForeground }]}>
                                Meta: {formatCurrency(selectedWallet.savingsGoal)}
                            </Text>
                        </Card>
                    </View>

                    {/* Expense Categories */}
                    <Card style={styles.categoriesCard}>
                        <Text style={[styles.cardTitle, { color: theme.cardForeground }]}>Distribuição de Gastos</Text>
                        <Text style={[styles.cardDescription, { color: theme.mutedForeground }]}>Para onde vai seu dinheiro</Text>
                        <View style={styles.categoriesList}>
                            {selectedWallet.expenseCategories.map((category, index) => (
                                <View key={index} style={styles.categoryItem}>
                                    <View style={styles.categoryInfo}>
                                        <View style={[styles.categoryColor, { backgroundColor: getCategoryColor(index) }]} />
                                        <Text style={[styles.categoryName, { color: theme.foreground }]}>{category.name}</Text>
                                    </View>
                                    <Text style={[styles.categoryValue, { color: theme.foreground }]}>{category.value}%</Text>
                                </View>
                            ))}
                        </View>
                    </Card>

                    {/* Recent Transactions */}
                    <Card style={styles.transactionsCard}>
                        <Text style={[styles.cardTitle, { color: theme.cardForeground }]}>Transações Recentes</Text>
                        <Text style={[styles.cardDescription, { color: theme.mutedForeground }]}>
                            Suas últimas movimentações financeiras
                        </Text>
                        <View style={styles.transactionsList}>
                            {selectedWallet.recentTransactions.map((transaction) => (
                                <View key={transaction.id} style={styles.transactionItem}>
                                    <View style={styles.transactionLeft}>
                                        <View
                                            style={[
                                                styles.transactionIcon,
                                                {
                                                    backgroundColor: transaction.amount > 0 ? "#dcfce7" : "#fef2f2",
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={{
                                                    color: transaction.amount > 0 ? "#16a34a" : "#dc2626",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {transaction.amount > 0 ? "+" : "-"}
                                            </Text>
                                        </View>
                                        <View style={styles.transactionInfo}>
                                            <Text style={[styles.transactionDescription, { color: theme.foreground }]}>
                                                {transaction.description}
                                            </Text>
                                            <Text style={[styles.transactionMeta, { color: theme.mutedForeground }]}>
                                                {transaction.date} • {transaction.category}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text
                                        style={[
                                            styles.transactionAmount,
                                            {
                                                color: transaction.amount > 0 ? "#16a34a" : "#dc2626",
                                            },
                                        ]}
                                    >
                                        {formatCurrency(transaction.amount)}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </Card>

                    {/* Quick Actions */}
                    <Card style={styles.actionsCard}>
                        <Text style={[styles.cardTitle, { color: theme.cardForeground }]}>Ações Rápidas</Text>
                        <Text style={[styles.cardDescription, { color: theme.mutedForeground }]}>
                            Acesse funcionalidades importantes
                        </Text>
                        <View style={styles.actionsGrid}>
                            <TouchableOpacity
                                style={[styles.actionItem, { backgroundColor: theme.muted }]}
                                onPress={() => handleQuickAction("Nova Transação")}
                            >
                                <View style={[styles.actionIcon, { backgroundColor: "#dbeafe" }]}>
                                    <Ionicons name="add" size={20} color="#2563eb" />
                                </View>
                                <Text style={[styles.actionText, { color: theme.foreground }]}>Nova Transação</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.actionItem, { backgroundColor: theme.muted }]}
                                onPress={() => handleQuickAction("Definir Meta")}
                            >
                                <View style={[styles.actionIcon, { backgroundColor: "#dcfce7" }]}>
                                    <Ionicons name="wallet" size={20} color="#16a34a" />
                                </View>
                                <Text style={[styles.actionText, { color: theme.foreground }]}>Definir Meta</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.actionItem, { backgroundColor: theme.muted }]}
                                onPress={() => handleQuickAction("Análise IA")}
                            >
                                <View style={[styles.actionIcon, { backgroundColor: "#f3e8ff" }]}>
                                    <Ionicons name="analytics" size={20} color="#9333ea" />
                                </View>
                                <Text style={[styles.actionText, { color: theme.foreground }]}>Análise IA</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.actionItem, { backgroundColor: theme.muted }]}
                                onPress={() => handleQuickAction("Relatórios")}
                            >
                                <View style={[styles.actionIcon, { backgroundColor: "#fed7aa" }]}>
                                    <Ionicons name="document-text" size={20} color="#ea580c" />
                                </View>
                                <Text style={[styles.actionText, { color: theme.foreground }]}>Relatórios</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

const getCategoryColor = (index: number) => {
    const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#FF6B6B"]
    return colors[index % colors.length]
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        fontSize: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
    },
    menuButton: {
        padding: 10,
        borderRadius: 8,
    },
    headerSpacer: {
        width: 44,
    },
    welcomeCard: {
        margin: 16,
        borderRadius: 12,
        padding: 20,
    },
    welcomeContent: {
        gap: 8,
    },
    welcomeTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff",
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: "#bfdbfe",
    },
    balanceContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 8,
    },
    balanceText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
    },
    summaryContainer: {
        paddingHorizontal: 16,
        gap: 16,
    },
    summaryCard: {
        padding: 16,
    },
    summaryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 14,
        fontWeight: "500",
    },
    iconContainer: {
        padding: 8,
        borderRadius: 20,
    },
    summaryValue: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 4,
    },
    summaryChange: {
        marginTop: 4,
    },
    changePositive: {
        fontSize: 12,
        color: "#16a34a",
    },
    changeNegative: {
        fontSize: 12,
        color: "#dc2626",
    },
    progressContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 8,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: "#e5e7eb",
        borderRadius: 4,
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#3b82f6",
        borderRadius: 4,
    },
    progressText: {
        fontSize: 12,
        fontWeight: "500",
    },
    goalText: {
        fontSize: 12,
        marginTop: 4,
    },
    categoriesCard: {
        margin: 16,
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
    categoriesList: {
        gap: 12,
    },
    categoryItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    categoryInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    categoryColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    categoryName: {
        fontSize: 14,
        fontWeight: "500",
    },
    categoryValue: {
        fontSize: 14,
        fontWeight: "bold",
    },
    transactionsCard: {
        margin: 16,
        padding: 16,
    },
    transactionsList: {
        gap: 16,
    },
    transactionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    transactionLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    transactionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    transactionInfo: {
        flex: 1,
    },
    transactionDescription: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 2,
    },
    transactionMeta: {
        fontSize: 12,
    },
    transactionAmount: {
        fontSize: 14,
        fontWeight: "bold",
    },
    actionsCard: {
        margin: 16,
        padding: 16,
        marginBottom: 32,
    },
    actionsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    actionItem: {
        width: (width - 64) / 2,
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 100,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    actionText: {
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center",
    },
})
