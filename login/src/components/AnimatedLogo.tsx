"use client"

import { useEffect, useRef } from "react"
import { View, StyleSheet, Animated } from "react-native"

export default function AnimatedLogo() {
  const pulseAnim = useRef(new Animated.Value(1)).current
  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    )

    // Rotate animation
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    )

    pulseAnimation.start()
    rotateAnimation.start()

    return () => {
      pulseAnimation.stop()
      rotateAnimation.stop()
    }
  }, [pulseAnim, rotateAnim])

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <View style={styles.container}>
      {/* Outer animated circle */}
      <Animated.View
        style={[
          styles.outerCircle,
          {
            transform: [{ rotate }],
          },
        ]}
      />

      {/* Middle pulsing circle */}
      <Animated.View
        style={[
          styles.middleCircle,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />

      {/* Inner circle */}
      <View style={styles.innerCircle} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  outerCircle: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    borderStyle: "solid",
  },
  middleCircle: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563eb",
  },
  innerCircle: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
})
