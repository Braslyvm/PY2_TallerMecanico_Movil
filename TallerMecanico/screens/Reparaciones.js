import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList,Alert } from "react-native";
import axios from "axios";
import { Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useGlobalContext } from "./GlobalContext"; // Importar el contexto global
import translateText from "./translate";

const ReparacionesScreen = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const { cliente, translate, dark } = useGlobalContext(); // Obtener cliente y estado de traducción

  useEffect(() => {
    if (cliente!="") { // Solo obtener reparaciones si cliente tiene un valor válido
      obtenerReparaciones();
    }
  }, [cliente, translate, reparaciones]); // Dependencias: cliente y translate

  const obtenerReparaciones = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3001/api/reparaciones/estado/En%20espera/cliente/`+String(cliente));
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
      console.log("Este es el cliente: ",cliente)
      console.error("Error al obtener reparaciones:", error);
    }
  };

  const obtenerEstado=(estado)=>{
    const estados = ["Pendiente", "En espera","Denegado", "En curso", "Facturar", "Finalizado"];
    const estadosTraducidos = ["Pending", "Waiting","Rejected", "In Progress", "To be Billed", "Completed"];
    const indiceEstado=estados.indexOf(estado);
    if (translate){
      return estadosTraducidos[indiceEstado];
    }else{
      return estados[indiceEstado];
    }
  }

  const cambiarEstadoReparacion = async (id, estado) => {
    try {
      await axios.put("http://10.0.2.2:3001/api/reparaciones/id/estado", { id, estado });
      Alert.alert(
        translate ? "Success" : "Éxito",
        translate ? `Repair ${estado.toLowerCase()} successfully.` : `Reparación ${estado.toLowerCase()} correctamente.`
      );
      obtenerReparaciones();
    } catch (error) {
      console.error("Error al cambiar el estado de la reparación:", error);
      Alert.alert(translate ? "Error" : "Error", translate ? "Could not change repair status." : "No se pudo cambiar el estado de la reparación.");
    }
  };

  const translatedContent = {
    title: translate ? "Pending Repairs" : "Reparaciones en Espera",
    approve: translate ? "Approve" : "Aprobar",
    reject: translate ? "Reject" : "Rechazar",
    noRepairs: translate ? "No pending repairs." : "No hay reparaciones en espera.",
  };

  const renderReparacion = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: dark ? "#444" : "#fff" }]}>
      <Card.Content>
        <Text style={[styles.title, { color: dark ? "#fff" : "#000" }]}>ID: {item.id_reparacion}</Text>
        <Text style={{ color: dark ? "#fff" : "#000" }}>{translate ? "Vehicle:" : "Vehículo:"} {item.id_vehiculo}</Text>
        <Text style={{ color: dark ? "#fff" : "#000" }}>{translate ? "Description:" : "Descripción:"} {item.descripcion}</Text>
        <Text style={{ color: dark ? "#fff" : "#000" }}>{translate ? "Technical Diagnosis:" : "Diagnóstico Técnico:"} {item.diagnostico_tecnico}</Text>
        <Text style={{ color: dark ? "#fff" : "#000" }}>{translate ? "Date:" : "Fecha:"} {item.fecha_reparacion}</Text>
        <Text style={{ color: dark ? "#fff" : "#000" }}>{translate ? "Status:" : "Estado:"} {item.estado}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" style={styles.buttonAprobar} onPress={() => cambiarEstadoReparacion(item.id_reparacion, "En curso")}>
          <Text style={styles.buttonText}><Icon name="check" size={15} color="#fff" /> {translatedContent.approve}</Text>
        </Button>
        <Button mode="contained" style={styles.buttonRechazar} onPress={() => cambiarEstadoReparacion(item.id_reparacion, "Denegado")}>
          <Text style={styles.buttonText}><Icon name="times" size={15} color="#fff" /> {translatedContent.reject}</Text>
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: dark ? "#333" : "#f5f5f5" }]}>
      <Text style={[styles.header, { color: dark ? "#fff" : "#000" }]}>{translatedContent.title}</Text>
      {reparaciones.length === 0 ? (
        <View style={styles.noReparacionesContainer}>
          <Text style={[styles.noReparacionesText, { color: dark ? "#fff" : "#888" }]}>{translatedContent.noRepairs}</Text>
        </View>
      ) : (
        <FlatList data={reparaciones} renderItem={renderReparacion} keyExtractor={(item) => item.id_reparacion.toString()} />
      )}
    </View>
  );
};

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
  buttonAprobar: {
    backgroundColor: "#4CAF50",
    marginRight: 8,
  },
  buttonRechazar: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#fff",
  },
  noReparacionesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noReparacionesText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default ReparacionesScreen;