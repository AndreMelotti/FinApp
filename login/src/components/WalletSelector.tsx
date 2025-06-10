"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useWallet } from "../context/WalletContext"

export default function WalletSelector() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { theme } = useTheme()
  const { wallets, selectedWallet, setSelectedWallet } = useWallet()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const handleWalletSelect = (wallet: any) => {
    setSelectedWallet(wallet)
    setIsModalVisible(false)
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.selector, { backgroundColor: theme.card, borderColor: theme.border }]}
        onPress={() => setIsModalVisible(true)}
      >
        <View style={styles.walletInfo}>
          <Ionicons name="wallet-outline" size={20} color={theme.foreground} />
          <View style={styles.walletDetails}>
            <Text style={[styles.walletName, { color: theme.foreground }]}>{selectedWallet?.name}</Text>
            <Text style={[styles.walletBalance, { color: theme.mutedForeground }]}>
              {formatCurrency(selectedWallet?.balance || 0)}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-down" size={16} color={theme.mutedForeground} />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.foreground }]}>Selecionar Carteira</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color={theme.foreground} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.walletList}>
              {wallets.map((wallet) => (
                <TouchableOpacity
                  key={wallet.id}
                  style={[
                    styles.walletItem,
                    {
                      backgroundColor: selectedWallet?.id === wallet.id ? theme.accent : theme.card,
                      borderColor: theme.border,
                    },
                  ]}
                  onPress={() => handleWalletSelect(wallet)}
                >
                  <View style={styles.walletItemContent}>
                    <Ionicons
                      name="wallet-outline"
                      size={24}
                      color={selectedWallet?.id === wallet.id ? theme.accentForeground : theme.foreground}
                    />
                    <View style={styles.walletItemDetails}>
                      <Text
                        style={[
                          styles.walletItemName,
                          {
                            color: selectedWallet?.id === wallet.id ? theme.accentForeground : theme.foreground,
                          },
                        ]}
                      >
                        {wallet.name}
                      </Text>
                      <Text
                        style={[
                          styles.walletItemBalance,
                          {
                            color: selectedWallet?.id === wallet.id ? theme.accentForeground : theme.mutedForeground,
                          },
                        ]}
                      >
                        {formatCurrency(wallet.balance)}
                      </Text>
                    </View>
                  </View>
                  {selectedWallet?.id === wallet.id && (
                    <Ionicons name="checkmark" size={20} color={theme.accentForeground} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  walletInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 8,
  },
  walletDetails: {
    flex: 1,
  },
  walletName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  walletBalance: {
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  walletList: {
    padding: 20,
  },
  walletItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  walletItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  walletItemDetails: {
    flex: 1,
  },
  walletItemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  walletItemBalance: {
    fontSize: 14,
  },
})
