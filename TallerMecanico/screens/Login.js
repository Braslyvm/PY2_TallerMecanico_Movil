import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
      navigation.replace('MainApp');

  };

  const register = () => {
    navigation.replace('Register');
  };

  return (
    <View style={[styles.center, { backgroundColor: '#fff' }]}>
      <Text style={[styles.title, { color: '#000' }]}>{"inicio de secion"}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: '#fff', color: '#000' }]}
        placeholder={"Correo Electronico"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { backgroundColor: '#fff', color:'#000' }]}
        placeholder={"Contraseña"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={[styles.boton, { backgroundColor:   '#E5D9F2' }]} onPress={handleLogin}>
        <Text style={[styles.textoBoton, { color: '#000' }]}>{'Iniciar sesión'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={register}>
        <Text style={[styles.link, { color: '#1e90ff' }]}>{'¿No tienes una cuenta? Regístrate'}</Text>
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
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  link: {
    marginTop: 20,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  boton: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  textoBoton: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

