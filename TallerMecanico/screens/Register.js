import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import translateText from './translate';
import { useGlobalContext } from './GlobalContext';
import axios from "axios";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [cedula, setCedula] = useState('');
  const [error, setError] = useState('');
  const [translatedContent, setTranslatedContent] = useState({
    registroUsuario: 'Registro de Usuario',
    correoElectronico: 'Correo Electrónico',
    contrasena: 'Contraseña',
    nombre: 'Nombre',
    apellido1: 'Primer Apellido',
    apellido2: 'Segundo Apellido',
    cedula: 'Cédula',
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
        const nombre = await translateText('Nombre', 'es', 'en');
        const apellido1 = await translateText('Primer Apellido', 'es', 'en');
        const apellido2 = await translateText('Segundo Apellido', 'es', 'en');
        const cedula = await translateText('Cédula', 'es', 'en');
        const registrarseButton = await translateText('Registrarse', 'es', 'en');
        const yaTienesCuenta = await translateText('¿Ya tienes una cuenta? Inicia sesión', 'es', 'en');
        setTranslatedContent({
          registroUsuario,
          correoElectronico,
          contrasena,
          nombre,
          apellido1,
          apellido2,
          cedula,
          registrarseButton,
          yaTienesCuenta,
        });
      } else {
        setTranslatedContent({
          registroUsuario: 'Registro de Usuario',
          correoElectronico: 'Correo Electrónico',
          contrasena: 'Contraseña',
          nombre: 'Nombre',
          apellido1: 'Primer Apellido',
          apellido2: 'Segundo Apellido',
          cedula: 'Cédula',
          registrarseButton: 'Registrarse',
          yaTienesCuenta: '¿Ya tienes una cuenta? Inicia sesión',
        });
      }
    };

    translateContent();
  }, [translate]);

  const handleRegister = () => {

    const correo = email;
    const contraseña = String(password);

    if (email && password && nombre && apellido1 && apellido2 && cedula) {

      const Cliente = { cedula, nombre, apellido1, apellido2, correo, contraseña  };
      axios
        .post("http://10.0.2.2:3001/api/cliente", Cliente) 
        .then((response) => {
            navigation.navigate('Login');
            Alert.alert('Registro exitoso', 'El usuario ha sido registrado correctamente.');
          })
          .catch((error) => {
            Alert.alert("Error, Usuario ya registrado.");
          });
    } else {
      Alert.alert(translatedContent.errorCorreoContrasena);
    }
    
  };

  return (
    <View style={[styles.container, { backgroundColor: dark ? '#333' : '#fff' }]}>
      <Text style={[styles.title, { color: dark ? '#fff' : '#000' }]}>{translatedContent.registroUsuario}</Text>
      {error ? <Text style={[styles.error, { color: dark ? '#ff6347' : 'red' }]}>{error}</Text> : null}
      
      <TextInput
        style={[styles.input, { backgroundColor: dark ? '#555' : '#fff', color: dark ? '#fff' : '#000' }]}
        placeholder={translatedContent.nombre}
        placeholderTextColor={dark ? '#ccc' : '#888'}
        value={nombre}
        onChangeText={setNombre}
      />
      
      <TextInput
        style={[styles.input, { backgroundColor: dark ? '#555' : '#fff', color: dark ? '#fff' : '#000' }]}
        placeholder={translatedContent.apellido1}
        placeholderTextColor={dark ? '#ccc' : '#888'}
        value={apellido1}
        onChangeText={setApellido1}
      />
      
      <TextInput
        style={[styles.input, { backgroundColor: dark ? '#555' : '#fff', color: dark ? '#fff' : '#000' }]}
        placeholder={translatedContent.apellido2}
        placeholderTextColor={dark ? '#ccc' : '#888'}
        value={apellido2}
        onChangeText={setApellido2}
      />
      
      <TextInput
        style={[styles.input, { backgroundColor: dark ? '#555' : '#fff', color: dark ? '#fff' : '#000' }]}
        placeholder={translatedContent.cedula}
        placeholderTextColor={dark ? '#ccc' : '#888'}
        keyboardType="numeric"
        value={cedula}
        onChangeText={setCedula}
      />

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
      
      <TouchableOpacity style={[styles.boton, { backgroundColor: dark ? '#444' : '#6A5ACD' }]} onPress={handleRegister}>
        <Text style={[styles.textoBoton, { color: dark ? '#fff' : '#fff' }]}>{translatedContent.registrarseButton}</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '85%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  error: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  boton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '85%',
    marginTop: 10,
    elevation: 5,
  },
  textoBoton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
