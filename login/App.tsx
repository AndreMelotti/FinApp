import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import LoginScreen from "./src/screens/LoginScreen"
import SignupScreen from "./src/screens/SignupScreen"
import DashboardScreen from "./src/screens/DashboardScreen"
import CalculadorasScreen from "./src/screens/CalculadorasScreen"
import DrawerContent from "./src/components/DrawerContent"
import { ThemeProvider } from "./src/context/ThemeContext"
import { WalletProvider } from "./src/context/WalletContext"
import { SafeAreaProvider } from "react-native-safe-area-context"

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerPosition: "left",
        drawerStyle: {
          width: 280,
        },
        overlayColor: "rgba(0, 0, 0, 0.5)",
        swipeEnabled: true,
        swipeEdgeWidth: 50,
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Calculadoras" component={CalculadorasScreen} />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <WalletProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar style="auto" />
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Main" component={DrawerNavigator} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </WalletProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}
