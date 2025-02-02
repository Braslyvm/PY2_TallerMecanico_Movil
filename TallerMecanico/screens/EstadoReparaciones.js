import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import axios from "axios";
import { Card } from "react-native-paper";
import { useGlobalContext } from "./GlobalContext"; // Importar el contexto global

const EstadoReparacionesScreen = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const { cliente } = useGlobalContext(); // Obtener el cliente desde el contexto global

  // Obtener todas las reparaciones del cliente
  useEffect(() => {
    obtenerReparaciones();
  }, [cliente, reparaciones]); // Ejecutar cada vez que cambie el cliente

  const obtenerReparaciones = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3001/api/reparaciones/cliente/${cliente}`);
      setReparaciones(response.data);
    } catch (error) {
      console.error("Error al obtener reparaciones:", error);
    }
  };

  // Renderizar cada reparación en la lista
  const renderReparacion = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>ID: {item.id_reparacion}</Text>
        <Text>Vehículo: {item.id_vehiculo}</Text>
        <Text>Descripción: {item.descripcion}</Text>
        <Text>Diagnóstico Técnico: {item.diagnostico_tecnico}</Text>
        <Text>Fecha: {item.fecha_reparacion}</Text>
        <Text>Estado: {item.estado}</Text>
        <View style={styles.progressContainer}>
          <EstadoReparacion estado={item.estado} />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estado de Reparaciones</Text>
      <FlatList
        data={reparaciones}
        renderItem={renderReparacion}
        keyExtractor={(item) => item.id_reparacion.toString()}
      />
    </View>
  );
};

// Componente para mostrar la barra de progreso según el estado
const EstadoReparacion = ({ estado }) => {
  const estados = ["Pendiente","En espera", "En curso","Facturar", "Finalizado"];
  const progress = new Animated.Value(0);

  useEffect(() => {
    // Animación de la barra de progreso
    Animated.timing(progress, {
      toValue: estados.indexOf(estado) + 1,
      duration: 5,
      useNativeDriver: false,
    }).start();
  }, [estado]);

  const width = progress.interpolate({
    inputRange: [0, estados.length],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.loaderContainer}>
      <View style={styles.loaderBackground} />
      <Animated.View style={[styles.loaderProgress, { width }]} />
      <Text style={styles.estadoText}>{estado}</Text>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  progressContainer: {
    marginTop: 10,
  },
  loaderContainer: {
    height: 4,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    position: "relative",
  },
  loaderBackground: {
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
  },
  loaderProgress: {
    height: "100%",
    backgroundColor: "#0071e2",
    position: "absolute",
    top: 0,
    left: 0,
  },
  estadoText: {
    marginTop: 5,
    fontSize: 14,
    color: "#0071e2",
    textAlign: "center",
  },
});

export default EstadoReparacionesScreen;