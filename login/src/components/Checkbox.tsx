import { TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface CheckboxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
}

export default function Checkbox({ checked, onCheckedChange, disabled = false }: CheckboxProps) {
  return (
    <TouchableOpacity
      style={[styles.checkbox, checked ? styles.checked : styles.unchecked]}
      onPress={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {checked && <Ionicons name="checkmark" size={14} color="#ffffff" />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checked: {
    backgroundColor: "#2563eb",
    borderWidth: 1,
    borderColor: "#2563eb",
  },
  unchecked: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
})
