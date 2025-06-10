"use client"

import { View, Text, ScrollView, StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface TableColumn {
  key: string
  title: string
}

interface TableRow {
  [key: string]: string | number
}

interface CustomTableProps {
  columns: TableColumn[]
  data: TableRow[]
}

export default function CustomTable({ columns, data }: CustomTableProps) {
  const { theme } = useTheme()

  return (
    <View style={[styles.container, { borderColor: theme.border }]}>
      {/* Header */}
      <View style={[styles.headerRow, { backgroundColor: theme.muted }]}>
        {columns.map((column) => (
          <Text key={column.key} style={[styles.headerCell, { color: theme.foreground }, { flex: 1 }]}>
            {column.title}
          </Text>
        ))}
      </View>

      {/* Body */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {data.map((row, index) => (
          <View
            key={index}
            style={[
              styles.dataRow,
              {
                backgroundColor: index % 2 === 0 ? theme.card : theme.background,
                borderBottomColor: theme.border,
              },
            ]}
          >
            {columns.map((column) => (
              <Text key={column.key} style={[styles.dataCell, { color: theme.foreground }, { flex: 1 }]}>
                {row[column.key]}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    maxHeight: 300,
  },
  headerRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerCell: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  scrollView: {
    maxHeight: 250,
  },
  dataRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  dataCell: {
    fontSize: 14,
    textAlign: "center",
  },
})
