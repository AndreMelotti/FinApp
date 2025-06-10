import type React from "react"
import { View, StyleSheet, type ViewStyle } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
}

export default function Card({ children, style }: CardProps) {
  const { theme } = useTheme()

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          borderRadius: theme.radius,
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
  },
})
