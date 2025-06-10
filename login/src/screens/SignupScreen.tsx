"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, SafeAreaView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import Card from "../components/Card"
import Button from "../components/Button"
import SocialButton from "../components/SocialButton"
import AnimatedLogo from "../components/AnimatedLogo"
import Checkbox from "../components/Checkbox"
import { useTheme } from "../context/ThemeContext"

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function SignupScreen({ navigation }: any) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const { theme, isDark } = useTheme()

  const gradientColors: [string, string] = isDark ? ["#082f49", "#042f2e"] : ["#dbeafe", "#ccfbf1"]

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Todos os campos são obrigatórios")
      return false
    }

    if (!formData.email.includes("@")) {
      setError("Por favor, insira um email válido")
      return false
    }

    if (formData.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      return false
    }

    if (!acceptTerms) {
      setError("Você precisa aceitar os termos de serviço e política de privacidade")
      return false
    }

    setError(null)
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setLoading(true)

    // Simulação de cadastro
    setTimeout(() => {
      setLoading(false)
      Alert.alert("Conta criada com sucesso!", "Você será redirecionado para a tela de login.", [
        {
          text: "OK",
          onPress: () => {
            // Navigate to login screen if navigation is available
            if (navigation?.navigate) {
              navigation.navigate("Login")
            }
          },
        },
      ])
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    Alert.alert(`Cadastro com ${provider}`, "Funcionalidade em desenvolvimento")
  }

  const handleTerms = () => {
    Alert.alert("Termos de Serviço", "Funcionalidade em desenvolvimento")
  }

  const handlePrivacy = () => {
    Alert.alert("Política de Privacidade", "Funcionalidade em desenvolvimento")
  }

  const handleLogin = () => {
    if (navigation?.navigate) {
      navigation.navigate("Login")
    } else {
      Alert.alert("Entrar", "Funcionalidade de navegação em desenvolvimento")
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <LinearGradient colors={gradientColors} style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo and Title */}
          <View style={styles.header}>
            <AnimatedLogo />
            <Text style={styles.title}>Monetrix</Text>
            <Text style={[styles.subtitle, { color: isDark ? "#a3a3a3" : "#6b7280" }]}>
              Gestão Financeira Inteligente
            </Text>
          </View>

          {/* Signup Card */}
          <Card style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: theme.cardForeground }]}>Criar Conta</Text>
              <Text style={[styles.cardDescription, { color: theme.mutedForeground }]}>
                Preencha os dados abaixo para criar sua conta
              </Text>
            </View>

            {error && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={18} color="#ef4444" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.form}>
              {/* Name Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.foreground }]}>Nome completo</Text>
                <View style={[styles.inputContainer, { borderColor: theme.border, backgroundColor: theme.card }]}>
                  <Ionicons name="person-outline" size={20} color={theme.mutedForeground} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: theme.foreground }]}
                    placeholder="Seu nome completo"
                    placeholderTextColor={theme.mutedForeground}
                    value={formData.name}
                    onChangeText={(value) => handleChange("name", value)}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.foreground }]}>Email</Text>
                <View style={[styles.inputContainer, { borderColor: theme.border, backgroundColor: theme.card }]}>
                  <Ionicons name="mail-outline" size={20} color={theme.mutedForeground} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: theme.foreground }]}
                    placeholder="seu@email.com"
                    placeholderTextColor={theme.mutedForeground}
                    value={formData.email}
                    onChangeText={(value) => handleChange("email", value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.foreground }]}>Senha</Text>
                <View style={[styles.inputContainer, { borderColor: theme.border, backgroundColor: theme.card }]}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={theme.mutedForeground}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, styles.passwordInput, { color: theme.foreground }]}
                    placeholder="••••••••"
                    placeholderTextColor={theme.mutedForeground}
                    value={formData.password}
                    onChangeText={(value) => handleChange("password", value)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color={theme.mutedForeground}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={[styles.helperText, { color: theme.mutedForeground }]}>
                  A senha deve ter pelo menos 8 caracteres
                </Text>
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.foreground }]}>Confirmar senha</Text>
                <View style={[styles.inputContainer, { borderColor: theme.border, backgroundColor: theme.card }]}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={theme.mutedForeground}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, styles.passwordInput, { color: theme.foreground }]}
                    placeholder="••••••••"
                    placeholderTextColor={theme.mutedForeground}
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleChange("confirmPassword", value)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons
                      name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color={theme.mutedForeground}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Terms Checkbox */}
              <View style={styles.checkboxContainer}>
                <Checkbox checked={acceptTerms} onCheckedChange={setAcceptTerms} />
                <View style={styles.termsTextContainer}>
                  <Text style={[styles.termsText, { color: theme.mutedForeground }]}>
                    Eu aceito os{" "}
                    <Text style={[styles.termsLink, { color: theme.primary }]} onPress={handleTerms}>
                      Termos de Serviço
                    </Text>{" "}
                    e{" "}
                    <Text style={[styles.termsLink, { color: theme.primary }]} onPress={handlePrivacy}>
                      Política de Privacidade
                    </Text>
                  </Text>
                </View>
              </View>

              {/* Signup Button */}
              <Button
                title={loading ? "Criando conta..." : "Criar conta"}
                onPress={handleSubmit}
                disabled={loading}
                loading={loading}
                style={styles.signupButton}
              />

              {/* Divider */}
              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
                <Text style={[styles.dividerText, { color: theme.mutedForeground, backgroundColor: theme.card }]}>
                  Ou continue com
                </Text>
                <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
              </View>

              {/* Social Login Buttons */}
              <View style={styles.socialButtons}>
                <SocialButton
                  provider="Google"
                  icon="logo-google"
                  onPress={() => handleSocialLogin("Google")}
                  style={styles.socialButton}
                />
                {/* <SocialButton
                  provider="Facebook"
                  icon="logo-facebook"
                  onPress={() => handleSocialLogin("Facebook")}
                  style={styles.socialButton}
                /> */}
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <View style={styles.loginRow}>
                <Text style={[styles.loginText, { color: theme.mutedForeground }]}>Já tem uma conta? </Text>
                <TouchableOpacity onPress={handleLogin}>
                  <Text style={[styles.loginLink, { color: theme.primary }]}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e40af",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
  card: {
    marginBottom: 24,
  },
  cardHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fee2e2",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 48,
  },
  inputIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    padding: 4,
    height: 28,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  termsTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  termsText: {
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    fontWeight: "500",
  },
  signupButton: {
    marginBottom: 24,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
    paddingHorizontal: 16,
    textTransform: "uppercase",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 0,
  },
  socialButton: {
    flex: 1,
    marginHorizontal: 6,
  },
  footer: {
    alignItems: "center",
  },
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "500",
  },
})
