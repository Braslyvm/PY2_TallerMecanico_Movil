import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';


const HomeScreen = () => {

  return (
    <View style={[styles.container, { backgroundColor:  '#fff' }]}>
      <Text style={[styles.title, { color:  '#333' }]}>{'Bienvenido a la página principal'}</Text>
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
