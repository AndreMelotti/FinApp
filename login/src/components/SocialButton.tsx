"use client"

import { TouchableOpacity, Text, StyleSheet, type ViewStyle } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"

interface SocialButtonProps {
  provider: string
  icon: keyof typeof Ionicons.glyphMap
  onPress: () => void
  style?: ViewStyle
}

export default function SocialButton({ provider, icon, onPress, style }: SocialButtonProps) {
  const { theme } = useTheme()

  const getIconColor = () => {
    switch (provider) {
      case "Google":
        return "#4285F4"
      case "Facebook":
        return "#1877F2"
      default:
        return theme.foreground
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderColor: theme.border,
          backgroundColor: theme.card,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={20} color={getIconColor()} />
      <Text style={[styles.text, { color: theme.foreground }]}>{provider}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
})
