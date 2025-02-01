import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useGlobalContext } from "./GlobalContext";
import axios from "axios";
import { Card } from "react-native-paper";
import RegistroVehiculoModal from "./RegistroVehiculo";

const Vehiculos = () => {
  const { translate, dark, cliente, setCliente } = useGlobalContext();
  const [autos, setautos] = useState(true);
  const [reparaciones, setreparaciones] = useState(false);
  const [detalles, setdetalles] = useState(false);
  const [vehiculos, setvehiculos] = useState([]);
  const [Reparacion, setReparacion] = useState([]);
  const [ID, setID] = useState("");
  const [Placa, setplaca] = useState("");
  const [selectedDetalles, setselectedDetalles] = useState(null);
  const [repuestos, setrepuestos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

  // Obtener repuestos
  const getRepuestos = (id) => {
    axios
      .get(`http://10.0.2.2:3001/api/RepuestosR/${id}`)
      .then((response) => {
        const reparacionesData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setrepuestos(reparacionesData);
      })
      .catch((error) => {
        AlertAviso("Ocurrió un error al obtener las reparaciones.");
      });
  };

  // Obtener vehículos
  const getVehiculos = () => {
    const cedula = cliente;
    axios
      .get(`http://10.0.2.2:3001/api/vehiculos/completa/Cliente/${cedula}`)
      .then((response) => {
        setvehiculos(response.data);
        if (response.data.length === 0) {
          AlertAviso("No hay Vehiculos registrados");
        }
      })
      .catch((error) => {
        AlertAviso("No hay vehiculos");
      });
  };

  useEffect(() => {
    getVehiculos();
  }, []);

  // Lógica de mostrar y ocultar
  const OpenAutos = () => {
    setautos(true);
    setreparaciones(false);
    setplaca("");
    setID("");
    setReparacion([]);
  };

  const Intermedio = (id, placa) => {
    getReparaciones(id);
    OpenReparaciones(id, placa);
  };

  const OpenReparaciones = (id, placa) => {
    setautos(false);
    setreparaciones(true);
    setID(id);
    setplaca(placa);
  };

  const OpenDetalles = (
    detalles,
    mecanico,
    fecha_reparacion,
    id_reparacion
  ) => {
    setselectedDetalles({
      detalles,
      mecanico,
      fecha_reparacion,
      id_reparacion,
      Placa,
    });
    getRepuestos(id_reparacion);
    setdetalles(true);
  };

  const CloseDetalles = () => {
    setdetalles(false);
    setselectedDetalles(null);
    setrepuestos([]);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: dark ? "#333" : "#fff" }]}
    >
      {autos && (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Mis Vehículos</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.addButtonText}>Agregar Vehículo</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.listContainer}>
            <View>
              {vehiculos.length > 0 ? (
                vehiculos.map((vehiculo) => (
                  <TouchableOpacity
                    key={vehiculo.id_vehiculo}
                    onPress={() =>
                      Intermedio(vehiculo.id_vehiculo, vehiculo.placa)
                    }
                  >
                    <Card style={styles.card}>
                      <Card.Content>
                        <Text style={styles.vehiculoText}>
                          Placa: {vehiculo.placa}
                        </Text>
                        <Text style={styles.vehiculoText}>
                          Marca: {vehiculo.marca}
                        </Text>
                        <Text style={styles.vehiculoText}>
                          Modelo: {vehiculo.modelo}
                        </Text>
                        <Text style={styles.vehiculoText}>
                          Año: {vehiculo.anio}
                        </Text>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noVehiculosText}>
                  No hay vehículos registrados.
                </Text>
              )}
            </View>
          </ScrollView>
        </>
      )}

      {/* Modal de Registro de Vehículo */}
      <RegistroVehiculoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        cedula={cliente} // Pasa la cédula del cliente al modal
      />

      {/* Resto del código... */}
    </View>
  );
};

export default Vehiculos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
  },
  card: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#fff",
  },
  vehiculoText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#000",
  },
  noVehiculosText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#000",
  },
});
