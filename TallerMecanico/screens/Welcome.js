import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function WelcomeScreen({ navigation }) {

  return (
    <View style={[styles.center, { backgroundColor: '#fff' }]}>
      <Text style={[styles.title, { color: '#000' }]}>{'¡Bienvenido!'}</Text>

      <TouchableOpacity 
        style={[styles.boton, { backgroundColor: '#E5D9F2' }]} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={[styles.textoBoton, { color: '#000' }]}>{'Iniciar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  textoBoton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
