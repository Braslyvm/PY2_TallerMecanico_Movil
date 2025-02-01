import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const ReparacionesScreen = () => {
  const [reparaciones, setReparaciones] = useState([]);

  // Obtener reparaciones en estado "En espera"
  useEffect(() => {
    obtenerReparaciones();
  }, []);

  const obtenerReparaciones = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:3001/api/reparaciones/estado/En%20espera");
      setReparaciones(response.data);
    } catch (error) {
      console.error("Error al obtener reparaciones:", error);
    }
  };

  // Cambiar el estado de una reparación
  const cambiarEstadoReparacion = async (id, estado) => {
    try {
      await axios.put("http://10.0.2.2:3001/api/reparaciones/id/estado", {
        id,
        estado,
      });
      Alert.alert("Éxito", `Reparación ${estado.toLowerCase()} correctamente.`);
      obtenerReparaciones(); // Actualizar la lista de reparaciones
    } catch (error) {
      console.error("Error al cambiar el estado de la reparación:", error);
      Alert.alert("Error", "No se pudo cambiar el estado de la reparación.");
    }
  };

  // Renderizar cada reparación en la lista
  const renderReparacion = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>ID: {item.id_reparacion}</Text>
        <Text>Vehículo: {item.id_vehiculo}</Text>
        <Text>Descripción: {item.descripcion}</Text>
        <Text>Fecha: {item.fecha_reparacion}</Text>
        <Text>Estado: {item.estado}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          style={styles.buttonAprobar}
          onPress={() => cambiarEstadoReparacion(item.id_reparacion, "En curso")}
        >
          <Icon name="check" size={15} color="#fff" /> Aprobar
        </Button>
        <Button
          mode="contained"
          style={styles.buttonRechazar}
          onPress={() => cambiarEstadoReparacion(item.id_reparacion, "Denegado")}
        >
          <Icon name="times" size={15} color="#fff" /> Rechazar
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reparaciones en Espera</Text>
      <FlatList
        data={reparaciones}
        renderItem={renderReparacion}
        keyExtractor={(item) => item.id_reparacion.toString()}
      />
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
  buttonAprobar: {
    backgroundColor: "#4CAF50",
    marginRight: 8,
  },
  buttonRechazar: {
    backgroundColor: "#F44336",
  },
});

export default ReparacionesScreen;