"use client"

import { View, Text, TextInput, StyleSheet, type ViewStyle, type TextInputProps } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface CustomInputProps extends Omit<TextInputProps, "style"> {
  label: string
  style?: ViewStyle
  error?: string
}

export default function CustomInput({ label, style, error, ...props }: CustomInputProps) {
  const { theme } = useTheme()

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, { color: theme.foreground }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: error ? theme.destructive : theme.border,
            backgroundColor: theme.card,
            color: theme.foreground,
          },
        ]}
        placeholderTextColor={theme.mutedForeground}
        {...props}
      />
      {error && <Text style={[styles.error, { color: theme.destructive }]}>{error}</Text>}
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 48,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
})
