"use client"

import type React from "react"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface CustomTabsProps {
  tabs: Tab[]
  defaultTab?: string
}

export default function CustomTabs({ tabs, defaultTab }: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)
  const { theme } = useTheme()

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content

  return (
    <View style={styles.container}>
      {/* Tab Headers */}
      <View style={[styles.tabsList, { backgroundColor: theme.muted }]}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabTrigger,
              {
                backgroundColor: activeTab === tab.id ? theme.background : "transparent",
              },
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab.id ? theme.foreground : theme.mutedForeground,
                  fontWeight: activeTab === tab.id ? "600" : "400",
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>{activeTabContent}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsList: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tabTrigger: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
  },
  tabContent: {
    flex: 1,
  },
})
