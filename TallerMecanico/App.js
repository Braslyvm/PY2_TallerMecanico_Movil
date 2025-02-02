import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalProvider } from './screens/GlobalContext'; // Asegúrate de que la ruta sea correcta
import FACTURAS from './screens/facturar'
// Importa las pantallas y MainApp
import WelcomeScreen from './screens/Welcome';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import AjustesScreen from './screens/Ajustes';
import MainApp from './screens/MainApp'; // Nueva ruta para MainApp

const Stack = createStackNavigator();

export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainApp" component={MainApp} />
          <Stack.Screen name="Ajustes" component={AjustesScreen} />
          <Stack.Screen name="Facturas" component={FACTURAS} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}
