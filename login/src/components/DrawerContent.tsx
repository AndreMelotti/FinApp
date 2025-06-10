"use client"

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import type { DrawerContentComponentProps } from "@react-navigation/drawer"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { LinearGradient } from "expo-linear-gradient"
import WalletSelector from "./WalletSelector"

interface NavigationItem {
  name: string
  label: string
  icon: keyof typeof Ionicons.glyphMap
}

const navigationItems: NavigationItem[] = [
  { name: "Dashboard", label: "Dashboard", icon: "bar-chart-outline" },
  { name: "Gestao", label: "Gestão", icon: "cash-outline" },
  { name: "Investimentos", label: "Investimentos", icon: "wallet-outline" },
  { name: "Metas", label: "Metas", icon: "flag-outline" },
  { name: "Dividas", label: "Dívidas", icon: "card-outline" },
  { name: "Calculadoras", label: "Calculadoras", icon: "calculator-outline" },
  { name: "Relatorios", label: "Relatórios", icon: "document-text-outline" },
  { name: "AnaliseIA", label: "Análise IA", icon: "bulb-outline" },
  { name: "HubInformacoes", label: "Hub de Informações", icon: "book-outline" },
]

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { theme, isDark } = useTheme()
  const { navigation, state } = props

  const handleNavigation = (screenName: string) => {
    navigation.closeDrawer()

    if (screenName === "Dashboard" || screenName === "Calculadoras") {
      navigation.navigate(screenName)
    } else {
      // For now, show alert for unimplemented screens
      setTimeout(() => {
        alert(`${screenName} - Funcionalidade em desenvolvimento`)
      }, 300)
    }
  }

  const isActive = (routeName: string) => {
    return state.routeNames[state.index] === routeName
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <LinearGradient colors={["#2563eb", "#14b8a6"]} style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <View style={styles.outerRing} />
            <View style={styles.innerCircle} />
            <View style={styles.centerDot} />
          </View>
          <Text style={styles.logoText}>Monetrix</Text>
        </View>
      </LinearGradient>

      {/* Wallet Selector */}
      <View style={styles.walletSelectorContainer}>
        <WalletSelector />
      </View>

      {/* Navigation Items */}
      <ScrollView style={styles.navigation} showsVerticalScrollIndicator={false}>
        {navigationItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={[styles.navigationItem, isActive(item.name) && { backgroundColor: theme.accent }]}
            onPress={() => handleNavigation(item.name)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={item.icon}
              size={20}
              color={isActive(item.name) ? theme.accentForeground : theme.foreground}
            />
            <Text
              style={[
                styles.navigationLabel,
                {
                  color: isActive(item.name) ? theme.accentForeground : theme.foreground,
                },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Profile Section */}
      <View style={[styles.profileSection, { borderTopColor: theme.border }]}>
        <TouchableOpacity
          style={[styles.profileButton, { backgroundColor: theme.muted }]}
          onPress={() => {
            navigation.closeDrawer()
            setTimeout(() => {
              alert("Perfil - Funcionalidade em desenvolvimento")
            }, 300)
          }}
        >
          <View style={styles.avatar}>
            <LinearGradient colors={["#2563eb", "#14b8a6"]} style={styles.avatarGradient}>
              <Text style={styles.avatarText}>U</Text>
            </LinearGradient>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.foreground }]}>Usuário</Text>
            <Text style={[styles.profileEmail, { color: theme.mutedForeground }]}>demo@monetrix.com</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={theme.mutedForeground} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  outerRing: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
  },
  innerCircle: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  centerDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2563eb",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  walletSelectorContainer: {
    padding: 16,
  },
  navigation: {
    flex: 1,
    paddingHorizontal: 16,
  },
  navigationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
    gap: 12,
  },
  navigationLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  profileSection: {
    borderTopWidth: 1,
    padding: 16,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  avatarGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 12,
  },
})
