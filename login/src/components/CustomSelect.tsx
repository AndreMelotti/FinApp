"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, type ViewStyle } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"

interface SelectOption {
  label: string
  value: string
}

interface CustomSelectProps {
  label: string
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  style?: ViewStyle
}

export default function CustomSelect({
  label,
  value,
  onValueChange,
  options,
  placeholder = "Selecione uma opção",
  style,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  const selectedOption = options.find((option) => option.value === value)

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue)
    setIsOpen(false)
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, { color: theme.foreground }]}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.trigger,
          {
            borderColor: theme.border,
            backgroundColor: theme.card,
          },
        ]}
        onPress={() => setIsOpen(true)}
      >
        <Text style={[styles.triggerText, { color: selectedOption ? theme.foreground : theme.mutedForeground }]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={theme.mutedForeground} />
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setIsOpen(false)}>
          <View style={[styles.modal, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.option, value === item.value && { backgroundColor: theme.accent }]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color: value === item.value ? theme.accentForeground : theme.foreground,
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                  {value === item.value && <Ionicons name="checkmark" size={20} color={theme.accentForeground} />}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
  },
  triggerText: {
    fontSize: 16,
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    maxHeight: "60%",
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
})
