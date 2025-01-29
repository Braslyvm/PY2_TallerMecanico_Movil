import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import translateText from './translate';
import { useGlobalContext } from './GlobalContext';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [translatedContent, setTranslatedContent] = useState({
    registroUsuario: 'Registro de Usuario',
    correoElectronico: 'Correo Electrónico',
    contrasena: 'Contraseña',
    registrarseButton: 'Registrarse',
    yaTienesCuenta: '¿Ya tienes una cuenta? Inicia sesión',
    errorCorreoContrasena: 'Por favor, ingresa un correo y una contraseña.',
  });
  const { translate, dark } = useGlobalContext();

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const registroUsuario = await translateText('Registro de Usuario', 'es', 'en');
        const correoElectronico = await translateText('Correo Electrónico', 'es', 'en');
        const contrasena = await translateText('Contraseña', 'es', 'en');
        const registrarseButton = await translateText('Registrarse', 'es', 'en');
        const yaTienesCuenta = await translateText('¿Ya tienes una cuenta? Inicia sesión', 'es', 'en');
        const errorCorreoContrasena = await translateText('Por favor, ingresa un correo y una contraseña.', 'es', 'en');
        setTranslatedContent({
          registroUsuario,
          correoElectronico,
          contrasena,
          registrarseButton,
          yaTienesCuenta,
          errorCorreoContrasena,
        });
      } else {
        setTranslatedContent({
          registroUsuario: 'Registro de Usuario',
          correoElectronico: 'Correo Electrónico',
          contrasena: 'Contraseña',
          registrarseButton: 'Registrarse',
          yaTienesCuenta: '¿Ya tienes una cuenta? Inicia sesión',
          errorCorreoContrasena: 'Por favor, ingresa un correo y una contraseña.',
        });
      }
    };

    translateContent();
  }, [translate]);

  const handleRegister = () => {
      Alert.alert('Registro exitoso', 'El usuario ha sido registrado correctamente.');
      navigation.navigate('Login');

  };

  return (
    <View style={[styles.container, { backgroundColor: dark ? '#333' : '#fff' }]}>
      <Text style={[styles.title, { color: dark ? '#fff' : '#000' }]}>{translatedContent.registroUsuario}</Text>
      {error ? <Text style={[styles.error, { color: dark ? '#ff6347' : 'red' }]}>{error}</Text> : null}
      <TextInput
        style={[styles.input, { backgroundColor: dark ? '#555' : '#fff', color: dark ? '#fff' : '#000' }]}
        placeholder={translatedContent.correoElectronico}
        placeholderTextColor={dark ? '#ccc' : '#888'}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { backgroundColor: dark ? '#555' : '#fff', color: dark ? '#fff' : '#000' }]}
        placeholder={translatedContent.contrasena}
        placeholderTextColor={dark ? '#ccc' : '#888'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={[styles.boton, { backgroundColor: dark ? '#444' : '#E5D9F2' }]} onPress={handleRegister}>
        <Text style={[styles.textoBoton, { color: dark ? '#fff' : '#000' }]}>{translatedContent.registrarseButton}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.link, { color: dark ? '#1e90ff' : '#1e90ff' }]}>{translatedContent.yaTienesCuenta}</Text>
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
