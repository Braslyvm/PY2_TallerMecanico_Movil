import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useGlobalContext } from './GlobalContext'; // Asegúrate de que la ruta sea correcta
import translateText from './translate'; // Asegúrate de que la ruta sea correcta

// Importa las pantallas
import HomeScreen from './Home';
import AjustesScreen from './Ajustes';
import WelcomeScreen from './Welcome';
import Vehiculos from './Vehiculos';

const Drawer = createDrawerNavigator();

export default function MainApp() {
  const { translate, dark } = useGlobalContext();
  const [translatedContent, setTranslatedContent] = useState({
    home: 'Inicio',
    convertir: 'Convertir',
    tipoCambio: 'Tipo de Cambio',
    ajustes: 'Ajustes',
    cerrarSesion: 'Cerrar Sesión',
    MisVehiculos: 'Mis Vehiculos',
  });

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const home = await translateText('Inicio', 'es', 'en');
        const convertir = await translateText('Conversor', 'es', 'en');
        const tipoCambio = await translateText('Tipo de Cambio', 'es', 'en');
        const ajustes = await translateText('Ajustes', 'es', 'en');
        const cerrarSesion = await translateText('Cerrar Sesión', 'es', 'en');
        const MisVehiculos = await translateText('Mis Vehiculosn', 'es', 'en');
        setTranslatedContent({ home, convertir, tipoCambio, ajustes, cerrarSesion , MisVehiculos});
      } else {
        setTranslatedContent({
          home: 'Inicio',
          convertir: 'Convertir',
          tipoCambio: 'Tipo de Cambio',
          ajustes: 'Ajustes',
          cerrarSesion: 'Cerrar Sesión',
          MisVehiculos: 'Mis Vehiculos',
        });
      }
    };

    translateContent();
  }, [translate]);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: dark ? '#121212' : '#E5D9F2', // Fondo más oscuro si dark es true
          width: 240,
        },
        drawerLabelStyle: {
          fontSize: 16,
          color: dark ? '#E5E5E5' : '#000', // Texto claro si dark es true
        },
        drawerActiveTintColor: dark ? '#007bff' : '#000', // Color de texto activo dependiendo del tema
        drawerInactiveTintColor: dark ? '#bbb' : '#555', // Color de texto inactivo dependiendo del tema
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: translatedContent.home,
          headerStyle: { backgroundColor: dark ? '#121212' : '#E5D9F2' }, // Encabezado más oscuro si dark es true
          headerTintColor: dark ? '#E5E5E5' : '#000', // Tinte de encabezado claro si dark es true
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Drawer.Screen
        name="Mis Vehiculos"
        component={Vehiculos}
        options={{
          drawerLabel: translatedContent.MisVehiculos,
          headerStyle: { backgroundColor: dark ? '#121212' : '#E5D9F2' }, // Encabezado más oscuro si dark es true
          headerTintColor: dark ? '#E5E5E5' : '#000', // Tinte de encabezado claro si dark es true
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Drawer.Screen
        name={translatedContent.ajustes}
        component={AjustesScreen}
        options={{
          drawerLabel: translatedContent.ajustes,
          headerStyle: { backgroundColor: dark ? '#121212' : '#E5D9F2' },
          headerTintColor: dark ? '#E5E5E5' : '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Drawer.Screen
        name={translatedContent.cerrarSesion}
        component={WelcomeScreen}
        options={{
          drawerLabel: translatedContent.cerrarSesion,
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
