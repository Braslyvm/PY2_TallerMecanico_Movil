import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleRegister = () => {
      Alert.alert('Registro exitoso', 'El usuario ha sido registrado correctamente.');
      navigation.navigate('Login');

  };

  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      <Text style={[styles.title, { color:'#000' }]}>{'Registro de Usuario'}</Text>
      {error ? <Text style={[styles.error, { color: 'red' }]}>{error}</Text> : null}
      <TextInput
        style={[styles.input, { backgroundColor: '#fff', color:  '#000' }]}
        placeholder={'Correo Electrónico'}
        placeholderTextColor={ '#888'}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { backgroundColor: '#fff', color: '#000' }]}
        placeholder={'Contraseña'}
        placeholderTextColor={'#888'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={[styles.boton, { backgroundColor:'#E5D9F2' }]} onPress={handleRegister}>
        <Text style={[styles.textoBoton, { color: '#000' }]}>{'Registrarse'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.link, { color: '#1e90ff' }]}>{'Por favor, ingresa un correo y una contraseña.'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  error: {
    marginBottom: 10,
    textAlign: 'center',
  },
  link: {
    marginTop: 20,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  boton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  textoBoton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
