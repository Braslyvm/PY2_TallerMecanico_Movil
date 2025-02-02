import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import { useGlobalContext } from "./GlobalContext";
import axios from "axios";
import { Card } from "react-native-paper";

const API_BASE_URL = "http://10.0.2.2:3001";

const FACTURAS = () => {
  const { translate, dark, cliente, setCliente } = useGlobalContext();
  const [facturas, setFacturas] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReparacion, setSelectedReparacion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar el modal

  // Función para obtener las facturas
  const facturasGet = () => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/api/Facturas2/${cliente}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setFacturas(response.data);
        } else {
          setFacturas([]);
          Alert.alert("Info", "No se encontraron facturas para este cliente.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener las facturas:", error);
        Alert.alert("Error", "Ocurrió un error al obtener las facturas.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Función para obtener los repuestos de una reparación
  const obtenerRepuestos = (idReparacion) => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/api/RepuestosR/${idReparacion}`)
      .then((response) => {
        setRepuestos(response.data);
        setSelectedReparacion(idReparacion);
        setModalVisible(true); // Abrir el modal al obtener los repuestos
      })
      .catch((error) => {
        console.error("Error al obtener los repuestos:", error);
        Alert.alert("Error", "Ocurrió un error al obtener los repuestos.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Función para actualizar el estado de la reparación a "Finalizado"
  const finalizarReparacion = () => {
    setLoading(true);
    axios
      .post(`${API_BASE_URL}/api/reparacionesU`, {
        id_reparacion: selectedReparacion,
        estado: "Finalizado",
      })
      .then((response) => {
        Alert.alert("Éxito", "Reparación finalizada correctamente.");
        setModalVisible(false); // Cerrar el modal
        facturasGet(); // Actualizar la lista de facturas
      })
      .catch((error) => {
        console.error("Error al finalizar la reparación:", error);
        Alert.alert("Error", "Ocurrió un error al finalizar la reparación.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Obtener las facturas cuando cambia el cliente
  useEffect(() => {
    if (cliente) {
      facturasGet();
    }
  }, [cliente]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : facturas.length > 0 ? (
        <ScrollView>
          {facturas.map((factura, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => obtenerRepuestos(factura.id_reparacion)}
            >
              <Card style={styles.card}>
                <Card.Content>
                  <Text>ID Reparación: {factura.id_reparacion}</Text>
                  <Text>Vehículo: {factura.placa}</Text>
                  <Text>Cliente: {factura.cliente}</Text>
                  <Text>Mecánico: {factura.mecanico}</Text>
                  <Text>Fecha: {factura.fecha_reparacion}</Text>
                  <Text>Descripción: {factura.descripcion}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text>No hay facturas disponibles.</Text>
      )}

      {/* Modal para mostrar los repuestos */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Repuestos usados en la reparación #{selectedReparacion}:
            </Text>
            <ScrollView>
              {repuestos.length > 0 ? (
                repuestos.map((repuesto) => (
                  <Card key={repuesto.id_repuesto} style={styles.repuestoCard}>
                    <Card.Content>
                      <Text>Descripción: {repuesto.descripcion}</Text>
                      <Text>Cantidad: {repuesto.cantidad_utilizada}</Text>
                      <Text>Precio unitario: ${repuesto.precio}</Text>
                      <Text>Total: ${repuesto.total}</Text>
                    </Card.Content>
                  </Card>
                ))
              ) : (
                <Text>No se usaron repuestos en esta reparación.</Text>
              )}
            </ScrollView>
            <Button
              title="Finalizar Reparación"
              onPress={finalizarReparacion}
              disabled={loading}
            />
            <Button
              title="Cerrar"
              onPress={() => setModalVisible(false)}
              color="#999"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  repuestoCard: {
    marginBottom: 10,
    elevation: 2,
  },
});

export default FACTURAS;
