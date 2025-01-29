import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';


// Importa las pantallas
import HomeScreen from './Home';

import WelcomeScreen from './Welcome';

const Drawer = createDrawerNavigator();

export default function MainApp() {

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#E5D9F2', // Fondo más oscuro si dark es true
          width: 240,
        },
        drawerLabelStyle: {
          fontSize: 16,
          color: '#000', // Texto claro si dark es true
        },
        drawerActiveTintColor:  '#000', // Color de texto activo dependiendo del tema
        drawerInactiveTintColor:  '#555', // Color de texto inactivo dependiendo del tema
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Inicio',
          headerStyle: { backgroundColor: '#E5D9F2' }, // Encabezado más oscuro si dark es true
          headerTintColor:  '#000', // Tinte de encabezado claro si dark es true
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Drawer.Screen
        name={'Cerrar sesion'}
        component={WelcomeScreen}
        options={{
          drawerLabel: 'Cerrar Sesión',
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
