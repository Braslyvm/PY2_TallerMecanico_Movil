import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useGlobalContext } from './GlobalContext';
import translateText from './translate';

const Ajustes = () => {
  const { dark, setDark, translate, setTranslate } = useGlobalContext();
  const [translatedContent, setTranslatedContent] = useState({
    ajustes: 'Ajustes',
    temaOscuro: 'Tema Oscuro',
    traducir: 'Traducir a inglés'
  });

  useEffect(() => {
    const translateContent = async () => {
      if (translate) {
        const ajustes = await translateText('Ajustes', 'es', 'en');
        const temaOscuro = await translateText('Tema Oscuro', 'es', 'en');
        const traducir = await translateText('Traducir a español', 'es', 'en');

        setTranslatedContent({
          ajustes,
          temaOscuro,
          traducir
        });
      } else {
        setTranslatedContent({
          ajustes: 'Ajustes',
          temaOscuro: 'Tema Oscuro',
          traducir: 'Traducir a inglés'
        });
      }
    };

    translateContent();
  }, [translate]);

  return (
    <View style={[styles.container, { backgroundColor: dark ? '#333' : '#fff' }]}>
      <Text style={[styles.title, { color: dark ? '#fff' : '#000' }]}>{translatedContent.ajustes}</Text>
      <View style={styles.control}>
        <Text style={{ color: dark ? '#fff' : '#000' }}>{translatedContent.temaOscuro}</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <View style={styles.control}>
        <Text style={{ color: dark ? '#fff' : '#000' }}>{translatedContent.traducir}</Text>
        <Switch value={translate} onValueChange={setTranslate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Ajustes;
