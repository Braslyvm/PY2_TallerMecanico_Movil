import React, { useEffect, useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import {View} from 'react-native'
import { useGlobalContext } from './GlobalContext'; // Asegúrate de que la ruta sea correcta
import translateText from './translate'; // Asegúrate de que la ruta sea correcta
import FACTURAS from "./facturar";
// Importa las pantallas
import HomeScreen from './Home';
import AjustesScreen from './Ajustes';
import WelcomeScreen from './Welcome';
import Vehiculos from './Vehiculos';
import ReparacionesScreen from './Reparaciones';
import EstadoReparacionesScreen from './EstadoReparaciones';

const Drawer = createDrawerNavigator();

// Componente personalizado para el contenido del Drawer
const CustomDrawerContent = (props) => {
  const { translate, dark } = useGlobalContext();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1, 
        backgroundColor: dark ? '#121212' : '#E5D9F2', // Fondo del Drawer
      }}
    >
      {/* Lista de elementos del Drawer */}
      <DrawerItemList {...props} />

      {/* Botón de Cerrar Sesión */}
      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
        <DrawerItem
          label={translate ? "Log Out" : "Cerrar Sesión"}
          onPress={() => props.navigation.navigate("Welcome")}
          labelStyle={{
            color: dark ? '#DDE6ED' : '#27374D',
            fontSize: 20,
            fontWeight: 'bold',
          }}
          style={{
            backgroundColor: dark ? '#27374D' : '#9DB2BF',
            margin: 5,
            borderRadius: 8,
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default function MainApp() {
  const { translate, dark } = useGlobalContext();
  const [translatedContent, setTranslatedContent] = useState({
    home: 'Inicio',
    convertir: 'Convertir',
    Facturas: "Facturas",
    MisReparaciones: 'Solicitudes',
    EstadoReparaciones: "Mis Reparaciones",
    ajustes: 'Ajustes',
    cerrarSesion: 'Cerrar Sesión',
    MisVehiculos: 'Mis Vehiculos',
  });

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const home = await translateText('Inicio', 'es', 'en');
        const ajustes = await translateText('Ajustes', 'es', 'en');
        const cerrarSesion = await translateText('Cerrar Sesión', 'es', 'en');
        const MisVehiculos = await translateText('Mis Vehiculos', 'es', 'en');
        const MisReparaciones = await translateText('Solicitudes', 'es', 'en');
        const Facturas = await translateText("Facturas", "es", "en");
        const EstadoReparaciones = await translateText('Mis reparaciones', 'es', 'en');
        setTranslatedContent({ home, MisReparaciones, Facturas, EstadoReparaciones, ajustes, cerrarSesion, MisVehiculos });
      } else {
        setTranslatedContent({
          home: 'Inicio',
          convertir: 'Convertir',
          Facturas: "Facturas",
          MisReparaciones: 'Solicitudes',
          EstadoReparaciones: "Mis Reparaciones",
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
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: dark ? '#121212' : '#E5D9F2', // Fondo del Drawer
          width: 240,
        },
        drawerLabelStyle: {
          fontSize: 20,
          color: dark ? '#DDE6ED' : '#27374D', // Color del texto
        },
        drawerActiveTintColor: dark ? '#007bff' : '#000', // Color de texto activo
        drawerInactiveTintColor: dark ? '#bbb' : '#555', // Color de texto inactivo
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: translatedContent.home,
          headerStyle: { backgroundColor: dark ? '#121212' : '#E5D9F2' },
          headerTintColor: dark ? '#DDE6ED' : '#27374D',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Drawer.Screen
        name={translatedContent.MisVehiculos}
        component={Vehiculos}
        options={{
          drawerLabel: translatedContent.MisVehiculos,
          headerStyle: { backgroundColor: dark ? '#121212' : '#E5D9F2' },
          headerTintColor: dark ? '#DDE6ED' : '#27374D',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Drawer.Screen
        name={translatedContent.MisReparaciones}
        component={ReparacionesScreen}
        options={{
          drawerLabel: translatedContent.MisReparaciones,
          headerStyle: { backgroundColor: dark ? '#121212' : '#E5D9F2' },
          headerTintColor: dark ? '#DDE6ED' : '#27374D',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Drawer.Screen
        name={translatedContent.EstadoReparaciones}
        component={EstadoReparacionesScreen}
        options={{
          drawerLabel: translatedContent.EstadoReparaciones,
          headerStyle: { backgroundColor: dark ? '#121212' : '#E5D9F2' },
          headerTintColor: dark ? '#DDE6ED' : '#27374D',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Drawer.Screen
        name={translatedContent.Facturas}
        component={FACTURAS}
        options={{
          drawerLabel: translatedContent.Facturas,
          headerStyle: { backgroundColor: dark ? '#121212' : '#E5D9F2' },
          headerTintColor: dark ? '#DDE6ED' : '#27374D',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Drawer.Screen
        name={translatedContent.ajustes}
        component={AjustesScreen}
        options={{
          drawerLabel: translatedContent.ajustes,
          headerStyle: { backgroundColor: dark ? '#121212' : '#E5D9F2' },
          headerTintColor: dark ? '#DDE6ED' : '#27374D',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Drawer.Navigator>
  );
}