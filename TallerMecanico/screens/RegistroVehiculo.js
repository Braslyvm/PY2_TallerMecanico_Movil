import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

export default function RegistroVehiculoModal({ visible, onClose, cedula }) {
  const [marcas, setMarcas] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [placa, setPlaca] = useState("");

  // Efecto para obtener las marcas al cargar el componente
  useEffect(() => {
    const getMarcas = () => {
      axios
        .get("http://10.0.2.2:3001/api/marcas")
        .then((response) => {
          setMarcas(response.data);
        })
        .catch((error) => console.error("Error al obtener marcas:", error));
    };

    getMarcas();
  }, []);

  // Función para manejar el registro del vehículo
  const handleRegistro = () => {
    if (!selectedMarca || !modelo || !anio || !placa) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos al servidor
    console.log("Datos del vehículo:", {
      id_marca: selectedMarca,
      modelo,
      anio,
      cedula,
      placa,
    });

    Alert.alert("Éxito", "Vehículo registrado correctamente");
    onClose(); // Cierra el modal después de registrar el vehículo
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Registro de Vehículo</Text>

          {/* Campo para mostrar la cédula del cliente */}
          <View style={styles.input}>
            <Text style={styles.cedulaText}>Cliente: {cedula}</Text>
          </View>

          {/* Selector de marcas */}
          <View style={styles.input}>
            <Picker
              selectedValue={selectedMarca}
              onValueChange={(itemValue) => setSelectedMarca(itemValue)}
            >
              <Picker.Item label="Seleccione una marca" value="" />
              {marcas.map((marca) => (
                <Picker.Item
                  key={marca.id_marca}
                  label={marca.nombre}
                  value={marca.id_marca}
                />
              ))}
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Modelo"
            value={modelo}
            onChangeText={setModelo}
          />

          <TextInput
            style={styles.input}
            placeholder="Año"
            value={anio}
            onChangeText={setAnio}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Placa del Vehículo"
            value={placa}
            onChangeText={setPlaca}
          />

          {/* Botones para registrar y cerrar */}
          <TouchableOpacity style={styles.button} onPress={handleRegistro}>
            <Text style={styles.buttonText}>Registrar Vehículo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  cedulaText: {
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
