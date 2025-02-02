import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useGlobalContext } from './GlobalContext';
import axios from "axios";
import { Card } from 'react-native-paper';
import RegistroVehiculoModal from "./RegistroVehiculo";

const Vehiculos = () => {
    const { translate, dark, cliente, setCliente } = useGlobalContext();
    const [autos, setautos] = useState(true);
    const [reparaciones, setreparaciones] = useState(false);
    const [detalles, setdetalles] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); 
    const [vehiculos, setvehiculos] = useState([]);
    const [Reparacion, setReparacion] = useState([]);
    const [ID, setID] = useState("");
    const [Placa, setplaca] = useState("");
    const [selectedDetalles, setselectedDetalles] = useState(null);
    const [repuestos, setrepuestos] = useState([]);

    // Obtener repuestos
    const getRepuestos = (id) => {
        axios
            .get(`http://10.0.2.2:3001/api/RepuestosR/${id}`)
            .then((response) => {
                const reparacionesData = Array.isArray(response.data) ? response.data : [response.data];
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
                    AlertAviso('No hay Vehiculos registrados');
                }
            })
            .catch((error) => {
                AlertAviso("No hay vehiculos");
            });
    };

    useEffect(() => {

    }, [Reparacion]);
    

    // Obtener reparaciones
    const getReparaciones = (id) => {
  axios
    .get(`http://10.0.2.2:3001/api/reparaciones2/${id}`)
    .then((response) => {
      
      const reparacionesData = Array.isArray(response.data) ? response.data : [response.data];
      setReparacion(reparacionesData);
    })
    .catch((error) => {
      AlertAviso("Ocurrió un error al obtener las reparaciones.");
    });
};


    useEffect(() => {
        getVehiculos();
    }, [vehiculos]);

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

    const OpenDetalles = (detalles, mecanico, fecha_reparacion, id_reparacion) => {
      setselectedDetalles({ detalles, mecanico, fecha_reparacion, id_reparacion, Placa });
      getRepuestos(id_reparacion);
      setdetalles(true);
  };
  

    const CloseDetalles = () => {
        setdetalles(false);
        setselectedDetalles(null);
        setrepuestos([]);
    };

    return (
      <View style={[styles.container, { backgroundColor: dark ? '#333' : '#fff' }]}>
          {autos && (
              <>
                  <View style={styles.header}>
                      <Text style={styles.title}>Mis Vehículos</Text>
                      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                          <Text style={styles.addButtonText}>Agregar Vehículo</Text>
                      </TouchableOpacity>
                  </View>
  
                  <ScrollView style={styles.listContainer}>
                      <View>
                          {vehiculos.length > 0 ? (
                              vehiculos.map((vehiculo) => (
                                  <TouchableOpacity key={vehiculo.id_vehiculo} onPress={() => Intermedio(vehiculo.id_vehiculo, vehiculo.placa)}>
                                      <Card style={styles.card}>
                                          <Card.Content>
                                              <Text style={styles.vehiculoText}>Placa: {vehiculo.placa}</Text>
                                              <Text style={styles.vehiculoText}>Marca: {vehiculo.marca}</Text>
                                              <Text style={styles.vehiculoText}>Modelo: {vehiculo.modelo}</Text>
                                              <Text style={styles.vehiculoText}>Año: {vehiculo.anio}</Text>
                                          </Card.Content>
                                      </Card>
                                  </TouchableOpacity>
                              ))
                          ) : (
                              <Text style={styles.noVehiculosText}>No hay vehículos registrados.</Text>
                          )}
                      </View>
                  </ScrollView>
              </>
          )}
          {reparaciones && (
            <View style={styles.reparacionesContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={OpenAutos}>
                        <Text style={styles.backButtonText}>Volver</Text>
                    </TouchableOpacity>
                    <Text style={styles.reparacionesTitle}>Reparaciones de {Placa}</Text>
                </View>

                {Reparacion.length > 0 ? (
                    Reparacion.map((reparacion) => (
                        <TouchableOpacity 
                            key={reparacion.id_reparacion} 
                            onPress={() => {
                                OpenDetalles(reparacion.descripcion, reparacion.mecanico, reparacion.fecha_reparacion, reparacion.id_reparacion);
                            }}
                        >
                            <Card style={styles.card}>
                                <Card.Content>
                                    <Text style={styles.reparacionText}>ID Reparación: {reparacion.id_reparacion}</Text>
                                    <Text style={styles.reparacionText}>Mecánico: {reparacion.mecanico}</Text>
                                    <Text style={styles.reparacionText}>Fecha de Reparación: {reparacion.fecha_reparacion}</Text>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noReparacionesText}>No hay reparaciones registradas.</Text>
                )}
            </View>
          )}
            {detalles && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={detalles}
                onRequestClose={CloseDetalles}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Detalles de Reparación</Text>
                    <Text style={styles.modalText}>Detalles: {selectedDetalles?.detalles}</Text>
                    <Text style={styles.modalText}>Mecánico: {selectedDetalles?.mecanico}</Text>
                    <Text style={styles.modalText}>Fecha de Reparación: {selectedDetalles?.fecha_reparacion}</Text>
                    <Text style={styles.modalText}>Placa: {selectedDetalles?.Placa}</Text>
                    <Text style={styles.modalSubTitle}>Repuestos Utilizados</Text>
                    {repuestos.length > 0 ? (
                      repuestos.map((repuesto) => (
                        <Text key={repuesto.id_reparacion} style={styles.modalText}>
                          Repuesto: {repuesto.descripcion} - Cantidad: {repuesto.cantidad_utilizada}
                        </Text>
                      ))
                    ) : (
                      <Text style={styles.modalText}>No hay repuestos registrados.</Text>
                    )}
                    <TouchableOpacity onPress={CloseDetalles} style={styles.closeButton}>
                      <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}
             <RegistroVehiculoModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                cedula={cliente} 
                dark={dark} 
                translate={translate} 
                  />
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
  },
  addButton: {
      backgroundColor: '#007BFF',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
  },
  addButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
  listContainer: {
      flex: 1,
  },
  card: {
      marginVertical: 8,
      padding: 16,
      borderRadius: 8,
      elevation: 3,
      backgroundColor: '#fff',
  },
  vehiculoText: {
      fontSize: 16,
      marginBottom: 4,
      color: '#000',
  },
  noVehiculosText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
      color: '#000',
  },
  reparacionesContainer: {
      flex: 1,
      padding: 16,
  },
  reparacionesTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 16, 
  },
  reparacionText: {
      fontSize: 16,
      marginBottom: 4,
  },
  noReparacionesText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
  },
  modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
      width: '80%',
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 8,
      alignItems: 'center',
  },
  modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  modalSubTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 5,
  },
  modalText: {
      fontSize: 16,
      marginBottom: 8,
      textAlign: 'center',
  },
  closeButton: {
      marginTop: 20,
      backgroundColor: '#007BFF',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
  },
  closeButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
  backButton: {
      backgroundColor: '#6c757d', 
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
  },
  backButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
});