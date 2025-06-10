"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, SafeAreaView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import Card from "../components/Card"
import Button from "../components/Button"
import SocialButton from "../components/SocialButton"
import AnimatedLogo from "../components/AnimatedLogo"
import { useTheme } from "../context/ThemeContext"

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const { theme, isDark } = useTheme()

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Por favor, preencha todos os campos")
            return
        }

        if (!email.includes("@")) {
            Alert.alert("Erro", "Por favor, insira um email válido")
            return
        }

        setLoading(true)

        // Simulaç��o de login
        setTimeout(() => {
            setLoading(false)
            if (email === "demo@monetrix.com" && password === "senha123") {
                Alert.alert("Sucesso", "Login realizado com sucesso!", [
                    {
                      text: "OK",
                      onPress: () => {
                        if (navigation?.navigate) {
                          navigation.navigate("Main")
                        }
                      },
                    },
                  ])
            } else {
                Alert.alert("Erro", "Credenciais inválidas")
            }
        }, 1500)
    }

    const handleForgotPassword = () => {
        Alert.alert("Recuperar Senha", "Funcionalidade em desenvolvimento")
    }

    const handleSignUp = () => {
        if (navigation?.navigate) {
            navigation.navigate("Signup")
        } else {
            Alert.alert("Cadastro", "Funcionalidade de navegação em desenvolvimento")
        }
    }

    const handleSocialLogin = (provider: string) => {
        Alert.alert(`Login com ${provider}`, "Funcionalidade em desenvolvimento")
    }

    const handleTerms = () => {
        Alert.alert("Termos de Serviço", "Funcionalidade em desenvolvimento")
    }

    const handlePrivacy = () => {
        Alert.alert("Política de Privacidade", "Funcionalidade em desenvolvimento")
    }

    const gradientColors: [string, string] = isDark ? ["#082f49", "#042f2e"] : ["#dbeafe", "#ccfbf1"]

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

                    {/* Login Card */}
                    <Card style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={[styles.cardTitle, { color: theme.cardForeground }]}>Entrar</Text>
                            <Text style={[styles.cardDescription, { color: theme.mutedForeground }]}>
                                Entre com suas credenciais para acessar sua conta
                            </Text>
                        </View>

                        <View style={styles.form}>
                            {/* Email Input */}
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: theme.foreground }]}>Email</Text>
                                <View style={[styles.inputContainer, { borderColor: theme.border, backgroundColor: theme.card }]}>
                                    <Ionicons name="mail-outline" size={20} color={theme.mutedForeground} style={styles.inputIcon} />
                                    <TextInput
                                        style={[styles.input, { color: theme.foreground }]}
                                        placeholder="seu@email.com"
                                        placeholderTextColor={theme.mutedForeground}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    // //autoComplete="email"
                                    />
                                </View>
                            </View>

                            {/* Password Input */}
                            <View style={styles.inputGroup}>
                                <View style={styles.labelRow}>
                                    <Text style={[styles.label, { color: theme.foreground }]}>Senha</Text>
                                    <TouchableOpacity onPress={handleForgotPassword}>
                                        <Text style={[styles.forgotPassword, { color: theme.primary }]}>Esqueceu a senha?</Text>
                                    </TouchableOpacity>
                                </View>
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
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    // //autoComplete="password"
                                    />
                                    <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                                        <Ionicons
                                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                                            size={20}
                                            color={theme.mutedForeground}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Login Button */}
                            <Button
                                title={loading ? "Entrando..." : "Entrar"}
                                onPress={handleLogin}
                                disabled={loading}
                                loading={loading}
                                style={styles.loginButton}
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
                            <View style={styles.signUpRow}>
                                <Text style={[styles.signUpText, { color: theme.mutedForeground }]}>Não tem uma conta? </Text>
                                <TouchableOpacity onPress={handleSignUp}>
                                    <Text style={[styles.signUpLink, { color: theme.primary }]}>Cadastre-se</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={[styles.termsText, { color: theme.mutedForeground }]}>
                                Ao continuar, você concorda com nossos{" "}
                                <Text style={[styles.termsLink, { color: theme.primary }]} onPress={handleTerms}>
                                    Termos de Serviço
                                </Text>{" "}
                                e{" "}
                                <Text style={[styles.termsLink, { color: theme.primary }]} onPress={handlePrivacy}>
                                    Política de Privacidade
                                </Text>
                                .
                            </Text>
                        </View>
                    </Card>

                    {/* Demo User Info */}
                    {/* <View style={styles.demoInfo}>
                        <View style={styles.demoRow}>
                            <Ionicons name="person-outline" size={16} color={isDark ? "#a3a3a3" : "#6b7280"} />
                            <Text style={[styles.demoText, { color: isDark ? "#a3a3a3" : "#6b7280" }]}>
                                Usuário de demonstração: demo@monetrix.com / senha123
                            </Text>
                        </View>
                    </View> */}
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
    labelRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    forgotPassword: {
      fontSize: 12,
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
    loginButton: {
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
    signUpRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    signUpText: {
      fontSize: 14,
    },
    signUpLink: {
      fontSize: 14,
      fontWeight: "500",
    },
    termsText: {
      fontSize: 12,
      textAlign: "center",
      lineHeight: 18,
      paddingHorizontal: 16,
    },
    termsLink: {
      fontWeight: "500",
    },
    demoInfo: {
      alignItems: "center",
    },
    demoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 16,
    },
    demoText: {
      fontSize: 14,
      textAlign: "center",
      flex: 1,
      marginLeft: 8,
    },
  })
