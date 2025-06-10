import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, type ViewStyle} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../context/ThemeContext"

interface ButtonProps {
    title: string
    onPress: () => void
    disabled?: boolean
    loading?: boolean
    style?: ViewStyle
}

export default function Button({title, onPress, disabled, loading, style}: ButtonProps){
  const { isDark } = useTheme()

  const gradientColors: [string, string] = disabled ? ["#9ca3af", "#9ca3af"] : isDark ? ["#3b82f6", "#14b8a6"] : ["#2563eb", "#14b8a6"]
    return(
        <TouchableOpacity style={[styles.container, style]} onPress={onPress} disabled={disabled || loading} activeOpacity={0.8}>
            <LinearGradient 
            colors={gradientColors} 
            style={styles.gradient}
            start={{x:0, y:0}}
            end={{x:1, y:0}}
            >
                {
                   loading ? <ActivityIndicator color="#ffffff" size="small" /> :
                   <Text style={styles.text}>{title}</Text>
                }
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      overflow: "hidden",
    },
    gradient: {
      height: 48,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
    },
  })