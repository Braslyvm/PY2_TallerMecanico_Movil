import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import axios from "axios";
import { Card } from "react-native-paper";
import { useGlobalContext } from "./GlobalContext";
import translateText from "./translate";

const EstadoReparacionesScreen = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const { cliente, translate, dark } = useGlobalContext();

  useEffect(() => {
    if (cliente!="") { // Solo obtener reparaciones si cliente tiene un valor válido
      obtenerReparaciones();
    }
  }, [cliente, translate,reparaciones]); // Dependencias: cliente y translate

  const obtenerReparaciones = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3001/api/reparaciones/cliente/${cliente}`);
      const reparacionesTraducidas = await Promise.all(
        response.data.map(async (reparacion) => ({
          ...reparacion,
          descripcion: translate ? await translateText(reparacion.descripcion, "es", "en") : reparacion.descripcion,
          diagnostico_tecnico: translate ? await translateText(reparacion.diagnostico_tecnico, "es", "en") : reparacion.diagnostico_tecnico,
          estado: obtenerEstado(reparacion.estado),
        }))
      );
      setReparaciones(reparacionesTraducidas);
    } catch (error) {
      console.error("Error al obtener reparaciones:", error);
    }
  };

  const obtenerEstado=(estado)=>{
    const estados = ["Pendiente", "En espera","Denegado", "En curso", "Facturar", "Finalizado"];
    const estadosTraducidos = ["Pending", "Waiting", "Rejected","In Progress", "To be Billed", "Completed"];
    const indiceEstado=estados.indexOf(estado);
    if (translate){
      return estadosTraducidos[indiceEstado];
    }else{
      return estados[indiceEstado];
    }
  }

  const translatedContent = {
    title: translate ? "Repair Status" : "Estado de Reparaciones",
    noRepairs: translate ? "No repairs registered." : "No hay reparaciones registradas.",
  };

  const renderReparacion = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: dark ? "#444" : "#fff" }]}>
      <Card.Content>
        <Text style={[styles.title, { color: dark ? "#fff" : "#000" }]}>ID: {item.id_reparacion}</Text>
        <Text style={{ color: dark ? "#fff" : "#000" }}>{translate ? "Vehicle:" : "Vehículo:"} {item.placa}</Text>
        <Text style={{ color: dark ? "#fff" : "#000" }}>{translate ? "Description:" : "Descripción:"} {item.descripcion}</Text>
        <Text style={{ color: dark ? "#fff" : "#000" }}>{translate ? "Technical Diagnosis:" : "Diagnóstico Técnico:"} {item.diagnostico_tecnico}</Text>
        <Text style={{ color: dark ? "#fff" : "#000" }}>{translate ? "Date:" : "Fecha:"} {item.fecha_reparacion}</Text>
        <Text style={{ color: dark ? "#fff" : "#000" }}>{translate ? "Status:" : "Estado:"} {item.estado}</Text>
        <View style={styles.progressContainer}>
          <EstadoReparacion estado={item.estado} translate={translate} dark={dark} />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: dark ? "#333" : "#f5f5f5" }]}>
      <Text style={[styles.header, { color: dark ? "#fff" : "#000" }]}>{translatedContent.title}</Text>
      {reparaciones.length === 0 ? (
        <Text style={[styles.noReparaciones, { color: dark ? "#fff" : "#888" }]}>{translatedContent.noRepairs}</Text>
      ) : (
        <FlatList
          data={reparaciones}
          renderItem={renderReparacion}
          keyExtractor={(item) => item.id_reparacion.toString()}
        />
      )}
    </View>
  );
};

const EstadoReparacion = ({ estado, translate, dark }) => {
  const estados = ["Pendiente", "En espera", "En curso", "Facturar", "Finalizado"];
  const estadosTraducidos = ["Pending", "Waiting", "In Progress", "To be Billed", "Completed"];
  const indiceEstado = translate ? estadosTraducidos.indexOf(estado) : estados.indexOf(estado);
  const progress = new Animated.Value(0);

  useEffect(() => {
    // Animación de la barra de progreso
    Animated.timing(progress, {
      toValue: indiceEstado + 1,
      useNativeDriver: false,
    }).start();
  }, [estado]);

  const width = progress.interpolate({
    inputRange: [0, estados.length],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.loaderContainer}>
      <View style={[styles.loaderBackground, { backgroundColor: dark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)" }]} />
      <Animated.View style={[styles.loaderProgress, { width, backgroundColor: dark ? "#0071e2" : "#0071e2" }]} />
      <Text style={[styles.estadoText, { color: dark ? "#fff" : "#0071e2" }]}>{estado}</Text>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    overflow: "hidden",
    position: "relative",
  },
  loaderBackground: {
    height: "100%",
    width: "100%",
  },
  loaderProgress: {
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  estadoText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
  noReparaciones: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default EstadoReparacionesScreen;