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
    // Validar que todos los campos estén presentes
    if (!selectedMarca || !modelo || !anio || !placa) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    // Crear el objeto vehiculo
    const vehiculo = { id_marca: selectedMarca, modelo, anio, cedula, placa };

    // Primero, obtener la lista de vehículos registrados
    axios
      .get("http://10.0.2.2:3001/api/vehiculos")
      .then((response) => {
        const vehiculosRegistrados = response.data;
        console.log(vehiculosRegistrados);

        // Verificar si el vehículo ya está registrado
        // Verificar si el vehículo ya está registrado
        const vehiculoExistente = vehiculosRegistrados.find((v) => {
          console.log(`Comparando: 
        Placa registrada: ${v.placa}, Placa nueva: ${placa}
        Cédula registrada: ${v.cedula}, Cédula nueva: ${cedula}
      `);

          return v.placa === placa && v.cedula === cedula;
        });
        if (vehiculoExistente) {
          Alert.alert("Error", "Vehículo ya registrado.");
        } else {
          axios
            .post("http://10.0.2.2:3001/api/vehiculos", vehiculo)
            .then((response) => {
              // Actualizar la lista de vehículos
              setvehiculos([...vehiculos, response.data]);

              // Mostrar mensaje de éxito
              Alert.alert(
                "Registro exitoso",
                "El vehículo ha sido registrado correctamente."
              );

              onClose();
            })
            .catch((error) => {
              // Manejar errores de la solicitud POST
              console.error("Error al registrar el vehículo:", error);
              Alert.alert("Error", "No se pudo registrar el vehículo.");
            });
        }
      })
      .catch((error) => {
        // Manejar errores de la solicitud GET
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
            { backgroundColor: dark ? "#121212" : "#E5D9F2" },
          ]}
        >
          <Text style={[styles.title, { color: dark ? "#fff" : "#000" }]}>
            Registro de Vehículo
          </Text>

          {/* Campo para mostrar la cédula del cliente */}
          <View
            style={[styles.input, { backgroundColor: dark ? "#333" : "#fff" }]}
          >
            <Text
              style={[styles.cedulaText, { color: dark ? "#fff" : "#000" }]}
            >
              Cliente: {cedula}
            </Text>
          </View>

          {/* Selector de marcas */}
          <View
            style={[styles.input, { backgroundColor: dark ? "#333" : "#fff" }]}
          >
            <Picker
              selectedValue={selectedMarca}
              onValueChange={(itemValue) => setSelectedMarca(itemValue)}
              style={{ color: dark ? "#fff" : "#000" }}
            >
              <Picker.Item label="Seleccione una marca" value="" />
              {marcas.map((marca) => (
                <Picker.Item
                  key={marca.id_marca}
                  label={marca.nombre}
                  value={marca.id_marca}
                  color={dark ? "#fff" : "#000"} // Cambia el color del texto del Picker
                />
              ))}
            </Picker>
          </View>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: dark ? "#333" : "#fff",
                color: dark ? "#fff" : "#000",
              },
            ]}
            placeholder="Modelo"
            placeholderTextColor={dark ? "#aaa" : "#888"}
            value={modelo}
            onChangeText={setModelo}
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: dark ? "#333" : "#fff",
                color: dark ? "#fff" : "#000",
              },
            ]}
            placeholder="Año"
            placeholderTextColor={dark ? "#aaa" : "#888"}
            value={anio}
            onChangeText={setAnio}
            keyboardType="numeric"
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: dark ? "#333" : "#fff",
                color: dark ? "#fff" : "#000",
              },
            ]}
            placeholder="Placa del Vehículo"
            placeholderTextColor={dark ? "#aaa" : "#888"}
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
  },
  modalContent: {
    width: "90%",
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
    justifyContent: "center",
  },
  cedulaText: {
    fontSize: 16,
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
