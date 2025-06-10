"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useColorScheme } from "react-native"

// Define theme colors based on the CSS variables provided
const lightTheme = {
  background: "#ffffff",
  foreground: "#0a0a0a",
  card: "#ffffff",
  cardForeground: "#0a0a0a",
  primary: "#171717",
  primaryForeground: "#fafafa",
  secondary: "#f5f5f5",
  secondaryForeground: "#171717",
  muted: "#f5f5f5",
  mutedForeground: "#737373",
  accent: "#f5f5f5",
  accentForeground: "#171717",
  destructive: "#ef4444",
  destructiveForeground: "#fafafa",
  border: "#e5e5e5",
  input: "#e5e5e5",
  ring: "#0a0a0a",
  chart1: "#e05d44",
  chart2: "#14b8a6",
  chart3: "#1e3a5f",
  chart4: "#eab308",
  chart5: "#f97316",
  radius: 8,
}

const darkTheme = {
  background: "#0a0a0a",
  foreground: "#fafafa",
  card: "#0a0a0a",
  cardForeground: "#fafafa",
  primary: "#fafafa",
  primaryForeground: "#171717",
  secondary: "#262626",
  secondaryForeground: "#fafafa",
  muted: "#262626",
  mutedForeground: "#a3a3a3",
  accent: "#262626",
  accentForeground: "#fafafa",
  destructive: "#7f1d1d",
  destructiveForeground: "#fafafa",
  border: "#262626",
  input: "#262626",
  ring: "#d4d4d4",
  chart1: "#3b82f6",
  chart2: "#10b981",
  chart3: "#f59e0b",
  chart4: "#a855f7",
  chart5: "#ec4899",
  radius: 8,
}

type Theme = typeof lightTheme
type ThemeMode = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme()
  const [themeMode, setThemeMode] = useState<ThemeMode>("system")

  // Determine if we should use dark mode
  const isDark = themeMode === "system" ? colorScheme === "dark" : themeMode === "dark"

  // Get the current theme based on dark mode
  const theme = isDark ? darkTheme : lightTheme

  return <ThemeContext.Provider value={{ theme, themeMode, setThemeMode, isDark }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
