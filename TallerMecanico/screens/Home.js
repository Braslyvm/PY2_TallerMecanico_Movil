import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useGlobalContext } from './GlobalContext';
import translateText from './translate';
import { Card, Title, Paragraph } from 'react-native-paper';

const HomeScreen = () => {
  const [translatedContent, setTranslatedContent] = useState({
    bienvenido: 'Bienvenido a nuestro taller mecánico',
    listoParaReparaciones: 'Listo para tus reparaciones',
  });

  const { translate, dark } = useGlobalContext();

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const bienvenido = await translateText('Bienvenido a nuestro taller mecánico', 'es', 'en');
        const listoParaReparaciones = await translateText('Listo para tus reparaciones', 'es', 'en');
        setTranslatedContent({
          bienvenido,
          listoParaReparaciones,
        });
      } else {
        setTranslatedContent({
          bienvenido: 'Bienvenido a nuestro taller mecánico',
          listoParaReparaciones: 'Listo para tus reparaciones',
        });
      }
    };

    translateContent();
  }, [translate]);

  return (
    <View style={[styles.container, { backgroundColor: dark ? '#333' : '#f7f7f7' }]}>
      <Card style={[styles.card, { backgroundColor: dark ? '#444' : '#fff' }]}>
        <Card.Content style={styles.cardContent}>
          {/* Imagen del taller y texto de bienvenida */}
          <View style={styles.welcomeSection}>
            <Image 
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqNxO0yi80eiQ30rt_KIyZQrvX8iWq-n2N4w&s' }}
              style={styles.tallerImage}
              resizeMode="contain"
            />
            <Title style={[styles.title, { color: dark ? '#fff' : '#333' }]}>
              {translatedContent.bienvenido}
            </Title>
          </View>

          {/* Imagen del mecánico y texto "Listo para tus reparaciones" */}
          <View style={styles.mechanicSection}>
            <Image 
              source={{ uri: 'https://png.pngtree.com/png-clipart/20241104/original/pngtree-mechanic-cartoon-art-png-image_16679984.png' }}
              style={styles.mechanicImage}
              resizeMode="contain"
            />
            <Paragraph style={[styles.subtitle, { color: dark ? '#ccc' : '#666' }]}>
              {translatedContent.listoParaReparaciones}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tallerImage: {
    width: 200,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  mechanicSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  mechanicImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    flexShrink: 1, // Permite que el texto se ajuste si es necesario
    marginLeft: 10, // Espacio entre la imagen del mecánico y el texto
  },
});

export default HomeScreen;