import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import axios from "axios";
import { useGlobalContext } from './GlobalContext';

const Vehiculos = () => {
    const { translate, dark, cliente } = useGlobalContext();
    const [autos, setautos] = useState(true);
    const [vehiculos, setvehiculos] = useState([]);
    const [ID, setID] = useState("");
    const [Placa, setplaca] = useState("");

    // obtener vehiculos
    const getVehiculos = () => {
        const cedula = cliente;
        axios
            .get(`http://10.0.2.2:3001/api/vehiculos/completa/Cliente/${cedula}`)
            .then((response) => {
                setvehiculos(response.data);
                if (response.data.length === 0) {
                    Alert.alert('No hay Vehículos registrados');
                }
            })
            .catch(() => {
                Alert.alert("No hay vehículos");
            });
    };

    useEffect(() => {
        getVehiculos();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: dark ? '#333' : '#fff' }]}>            
            {autos && (
                <View>
                    <Text style={styles.title}>Mis Vehículos</Text>
                    {vehiculos.length > 0 ? (
                        vehiculos.map((vehiculo, index) => (
                            <TouchableOpacity key={index} onPress={() => { setID(vehiculo.id_vehiculo); setplaca(vehiculo.placa); }}>
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
                        <Text>No hay vehículos registrados.</Text>
                    )}
                </View>
            )}
        </View>
    );
};

export default Vehiculos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
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
    },
});
