import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useGlobalContext } from './GlobalContext';
import translateText from './translate';

export default function WelcomeScreen({ navigation }) {
  const [translatedContent, setTranslatedContent] = useState({
    bienvenido: '¡Bienvenido!',
    iniciar: 'Iniciar',
  });
  const { translate, dark ,cliente, setCliente} = useGlobalContext();

  useEffect(() => {
    setCliente("");
    const translateContent = async () => {
      if (translate) {
        const bienvenido = await translateText('¡Bienvenido!', 'es', 'en');
        const iniciar = await translateText('Iniciar', 'es', 'en');
        setTranslatedContent({ bienvenido, iniciar });
      } else {
        setTranslatedContent({
          bienvenido: '¡Bienvenido al taller!',
          iniciar: 'Iniciar',
        });
      }
    };

    translateContent();
  }, [translate]);

  return (
    <View style={[styles.center, { backgroundColor: dark ? '#333' : '#fff' }]}>
      
      <Text style={[styles.title, { color: dark ? '#fff' : '#000' }]}>{translatedContent.bienvenido}</Text>
      <Image
        source={require('../imagenes/taller.jpg')}
        style={styles.imagen}
  
      />
      <TouchableOpacity 
        style={[styles.boton, { backgroundColor: dark ? '#555' : '#E5D9F2' }]} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={[styles.textoBoton, { color: dark ? '#fff' : '#000' }]}>{translatedContent.iniciar}</Text>
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
  imagen: {
    width: '90%', // Ocupa el 90% del ancho del contenedor
    height: 200,  // Ajusta la altura según sea necesario
    marginBottom: 20,
    borderRadius: 10,
  },
});