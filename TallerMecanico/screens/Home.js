import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useGlobalContext } from './GlobalContext';
import translateText from './translate';

const HomeScreen = () => {
  const [translatedContent, setTranslatedContent] = useState({
    bienvenido: 'Bienvenido a la página principal',
  });
  const { translate, dark } = useGlobalContext();

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const bienvenido = await translateText('Bienvenido a la página principal', 'es', 'en');
        setTranslatedContent({ bienvenido });
      } else {
        setTranslatedContent({
          bienvenido: 'Bienvenido a la página principal',
        });
      }
    };

    translateContent();
  }, [translate]);

  return (
    <View style={[styles.container, { backgroundColor: dark ? '#333' : '#fff' }]}>
      <Text style={[styles.title, { color: dark ? '#fff' : '#333' }]}>{translatedContent.bienvenido}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
