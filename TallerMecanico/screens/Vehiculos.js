import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useGlobalContext } from './GlobalContext';
import axios from "axios";
import { Card } from 'react-native-paper';
import RegistroVehiculoModal from "./RegistroVehiculo";
import translateText from './translate';

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

    // Estado para los textos traducidos
    const [translatedContent, setTranslatedContent] = useState({
        misVehiculos: 'Mis Vehículos',
        agregarVehiculo: 'Agregar Vehículo',
        noVehiculos: 'No hay vehículos registrados.',
        reparacionesDe: 'Reparaciones de',
        volver: 'Volver',
        detallesReparacion: 'Detalles de Reparación',
        repuestosUtilizados: 'Repuestos Utilizados',
        noReparaciones: 'No hay reparaciones registradas.',
        noRepuestos: 'No hay repuestos registrados.',
        cerrar: 'Cerrar',
        Placa: 'placa',
        Marca: 'Marca',
        Modelo: 'Modelo',
        Año: 'Año',
        IDReparación: 'ID Reparación',
        Mecánico: 'Mecánico',
        FechadeReparación: 'Fecha de Reparación',
        Detalles: 'Detalles',
        Repuesto: 'Repuesto',
        Cantidad: 'Cantidad'

        
    });
    useEffect(() => {
        const translateContent = async () => {
            if (translate) {
                const misVehiculos = await translateText('Mis Vehículos', 'es', 'en');
                const agregarVehiculo = await translateText('Agregar Vehículo', 'es', 'en');
                const noVehiculos = await translateText('No hay vehículos registrados.', 'es', 'en');
                const reparacionesDe = await translateText('Reparaciones de', 'es', 'en');
                const volver = await translateText('Volver', 'es', 'en');
                const detallesReparacion = await translateText('Detalles de Reparación', 'es', 'en');
                const repuestosUtilizados = await translateText('Repuestos Utilizados', 'es', 'en');
                const noReparaciones = await translateText('No hay reparaciones registradas.', 'es', 'en');
                const noRepuestos = await translateText('No hay repuestos registrados.', 'es', 'en');
                const cerrar = await translateText('Cerrar', 'es', 'en');
                const Placa = await translateText('placa', 'es', 'en');
                const Marca = await translateText('Marca', 'es', 'en');
                const Modelo = await translateText('Modelo', 'es', 'en');
                const Año = await translateText('Año', 'es', 'en');
                const IDReparación = await translateText('ID Reparación', 'es', 'en');
                const Mecánico = await translateText('Mecánico', 'es', 'en');
                const FechadeReparación = await translateText('Fecha de Reparación', 'es', 'en');
                const Detalles = await translateText('Detalles', 'es', 'en');
                const Repuesto = await translateText('Repuesto', 'es', 'en');
                const Cantidad = await translateText('Cantidad', 'es', 'en');
               
      
                setTranslatedContent({
                    misVehiculos,
                    agregarVehiculo,
                    noVehiculos,
                    reparacionesDe,
                    volver,
                    detallesReparacion,
                    repuestosUtilizados,
                    noReparaciones,
                    noRepuestos,
                    cerrar,
                    Placa,
                    Marca,
                    Modelo,
                    Año,
                    IDReparación,
                    Mecánico,
                    FechadeReparación,
                    Detalles,
                    Repuesto,
                    Cantidad
                });
            } else {
                setTranslatedContent({
                    misVehiculos: 'Mis Vehículos',
                    agregarVehiculo: 'Agregar Vehículo',
                    noVehiculos: 'No hay vehículos registrados.',
                    reparacionesDe: 'Reparaciones de',
                    volver: 'Volver',
                    detallesReparacion: 'Detalles de Reparación',
                    repuestosUtilizados: 'Repuestos Utilizados',
                    noReparaciones: 'No hay reparaciones registradas.',
                    noRepuestos: 'No hay repuestos registrados.',
                    cerrar: 'Cerrar',
                    Placa: 'placa',
                    Marca: 'Marca',
                    Modelo: 'Modelo',
                    Año: 'Año',
                    IDReparación: 'ID Reparación',
                    Mecánico: 'Mecánico',
                    FechadeReparación: 'Fecha de Reparación',
                    Detalles: 'Detalles',
                    Repuesto: 'Repuesto',
                    Cantidad: 'Cantidad'
                });
            }
        };

        translateContent();
    }, [translate]);

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
                        <Text style={styles.title}>{translatedContent.misVehiculos}</Text>
                        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.addButtonText}>{translatedContent.agregarVehiculo}</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.listContainer}>
                        <View>
                            {vehiculos.length > 0 ? (
                                vehiculos.map((vehiculo) => (
                                    <TouchableOpacity key={vehiculo.id_vehiculo} onPress={() => Intermedio(vehiculo.id_vehiculo, vehiculo.placa)}>
                                        <Card style={styles.card}>
                                            <Card.Content>
                                                <Text style={styles.vehiculoText}>{translatedContent.Placa}: {vehiculo.placa}</Text>
                                                <Text style={styles.vehiculoText}>{translatedContent.Marca}: {vehiculo.marca}</Text>
                                                <Text style={styles.vehiculoText}>{translatedContent.Modelo}: {vehiculo.modelo}</Text>
                                                <Text style={styles.vehiculoText}>{translatedContent.Año}: {vehiculo.anio}</Text>
                                            </Card.Content>
                                        </Card>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={styles.noVehiculosText}>{translatedContent.noVehiculos}</Text>
                            )}
                        </View>
                    </ScrollView>
                </>
            )}
            {reparaciones && (
                <View style={styles.reparacionesContainer}>
                    <View style={styles.header}>
                        <Text style={styles.reparacionesTitle}>{translatedContent.reparacionesDe} {Placa}</Text>
                        <TouchableOpacity style={styles.backButton} onPress={OpenAutos}>
                            <Text style={styles.backButtonText}>{translatedContent.volver}</Text>
                        </TouchableOpacity>
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
                                        <Text style={styles.reparacionText}>{translatedContent.IDReparación}: {reparacion.id_reparacion}</Text>
                                        <Text style={styles.reparacionText}>{translatedContent.Mecánico}: {reparacion.mecanico}</Text>
                                        <Text style={styles.reparacionText}>{translatedContent.FechadeReparación}: {reparacion.fecha_reparacion}</Text>
                                    </Card.Content>
                                </Card>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.noReparacionesText}>{translatedContent.noReparaciones}</Text>
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
                            <Text style={styles.modalTitle}>{translatedContent.detallesReparacion}</Text>
                            
                            <View style={styles.detailSection}>
                                <Text style={styles.detailLabel}>{translatedContent.Detalles}:</Text>
                                <Text style={styles.detailText}>{selectedDetalles?.detalles}</Text>
                            </View>

                            <View style={styles.detailSection}>
                                <Text style={styles.detailLabel}>{translatedContent.Mecánico}:</Text>
                                <Text style={styles.detailText}>{selectedDetalles?.mecanico}</Text>
                            </View>

                            <View style={styles.detailSection}>
                                <Text style={styles.detailLabel}>{translatedContent.FechadeReparación}:</Text>
                                <Text style={styles.detailText}>{selectedDetalles?.fecha_reparacion}</Text>
                            </View>

                            <View style={styles.detailSection}>
                                <Text style={styles.detailLabel}>{translatedContent.Placa}:</Text>
                                <Text style={styles.detailText}>{selectedDetalles?.Placa}</Text>
                            </View>

                            <Text style={styles.modalSubTitle}>{translatedContent.repuestosUtilizados}</Text>
                            
                            <ScrollView style={styles.repuestosContainer}>
                                {repuestos.length > 0 ? (
                                    repuestos.map((repuesto) => (
                                        <View key={repuesto.id_reparacion} style={styles.repuestoItem}>
                                            <Text style={styles.repuestoText}>
                                                <Text style={styles.repuestoLabel}>{translatedContent.Repuesto}:</Text> {repuesto.descripcion}
                                            </Text>
                                            <Text style={styles.repuestoText}>
                                                <Text style={styles.repuestoLabel}>{translatedContent.Cantidad}:</Text> {repuesto.cantidad_utilizada}
                                            </Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={styles.noRepuestosText}>{translatedContent.noRepuestos}</Text>
                                )}
                            </ScrollView>

                            <TouchableOpacity onPress={CloseDetalles} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>{translatedContent.cerrar}</Text>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalSubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  detailSection: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  repuestosContainer: {
    maxHeight: 150,
    marginBottom: 20,
  },
  repuestoItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  repuestoText: {
    fontSize: 14,
    color: '#333',
  },
  repuestoLabel: {
    fontWeight: 'bold',
  },
  noRepuestosText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});