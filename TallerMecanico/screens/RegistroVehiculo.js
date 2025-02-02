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

export default function RegistroVehiculoModal({
  visible,
  onClose,
  cedula,
  dark,
}) {
  const [marcas, setMarcas] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [placa, setPlaca] = useState("");
  const [vehiculos, setvehiculos] = useState("");

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

  const handleRegistro = () => {
    if (!selectedMarca || !modelo || !anio || !placa) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    const vehiculo = { id_marca: selectedMarca, modelo, anio, cedula, placa };

    axios
      .get("http://10.0.2.2:3001/api/vehiculos")
      .then((response) => {
        const vehiculosRegistrados = response.data;
        const vehiculoExistente = vehiculosRegistrados.find(
          (v) => v.placa === placa && v.cedula === cedula
        );
        if (vehiculoExistente) {
          Alert.alert("Error", "Vehículo ya registrado.");
        } else {
          axios
            .post("http://10.0.2.2:3001/api/vehiculos", vehiculo)
            .then((response) => {
              setvehiculos([...vehiculos, response.data]);
              Alert.alert(
                "Registro exitoso",
                "El vehículo ha sido registrado correctamente."
              );
              onClose();
            })
            .catch((error) => {
              console.error("Error al registrar el vehículo:", error);
              Alert.alert("Error", "No se pudo registrar el vehículo.");
            });
        }
      })
      .catch((error) => {
        console.error("Error al obtener los vehículos:", error);
        Alert.alert("Error", "No se pudo verificar los vehículos registrados.");
      });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.modalContainer,
          {
            backgroundColor: dark ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.5)",
          },
        ]}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: dark ? "#121212" : "#FFFFFF" },
          ]}
        >
          <Text style={[styles.title, { color: dark ? "#FFFFFF" : "#000000" }]}>
            Registro de Vehículo
          </Text>

          <View
            style={[styles.input, { backgroundColor: dark ? "#333333" : "#F0F0F0" }]}
          >
            <Text
              style={[styles.cedulaText, { color: dark ? "#FFFFFF" : "#000000" }]}
            >
              Cliente: {cedula}
            </Text>
          </View>

          <View
            style={[styles.input, { backgroundColor: dark ? "#333333" : "#F0F0F0" }]}
          >
            <Picker
              selectedValue={selectedMarca}
              onValueChange={(itemValue) => setSelectedMarca(itemValue)}
              style={{ color: dark ? "#FFFFFF" : "#000000" }}
            >
              <Picker.Item label="Seleccione una marca" value="" />
              {marcas.map((marca) => (
                <Picker.Item
                  key={marca.id_marca}
                  label={marca.nombre}
                  value={marca.id_marca}
                  color={dark ? "#FFFFFF" : "#000000"}
                />
              ))}
            </Picker>
          </View>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: dark ? "#333333" : "#F0F0F0",
                color: dark ? "#FFFFFF" : "#000000",
              },
            ]}
            placeholder="Modelo"
            placeholderTextColor={dark ? "#AAAAAA" : "#888888"}
            value={modelo}
            onChangeText={setModelo}
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: dark ? "#333333" : "#F0F0F0",
                color: dark ? "#FFFFFF" : "#000000",
              },
            ]}
            placeholder="Año"
            placeholderTextColor={dark ? "#AAAAAA" : "#888888"}
            value={anio}
            onChangeText={setAnio}
            keyboardType="numeric"
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: dark ? "#333333" : "#F0F0F0",
                color: dark ? "#FFFFFF" : "#000000",
              },
            ]}
            placeholder="Placa del Vehículo"
            placeholderTextColor={dark ? "#AAAAAA" : "#888888"}
            value={placa}
            onChangeText={setPlaca}
          />

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
  },
  modalContent: {
    width: "90%",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
  },
  cedulaText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: "#FF3B30",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});