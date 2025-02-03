import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import CryptoJS from "crypto-js";

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
  const [currentImage, setCurrentImage] = useState(null);
  

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

  const handlePickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permiso necesario", "Se necesita acceso a la galería para seleccionar una imagen.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
        base64: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const imageBase64 = result.assets[0].base64;
        // Asegúrate de que la imagen no esté vacía
        if (imageBase64 && imageBase64.trim() !== "") {
          const encryptedImage = CryptoJS.AES.encrypt(imageBase64, "clave_secreta").toString();
          setCurrentImage(encryptedImage);
        } else {
          Alert.alert("Error", "La imagen seleccionada no es válida.");
        }
      } else {
      }
    } catch (error) {
    }
  };

  const handleRegistro = () => {
    if (!selectedMarca || !modelo || !anio || !placa || !currentImage) {
      Alert.alert(
        "Error",
        "Todos los campos son obligatorios, incluyendo la foto."
      );
      return;
    }

    const vehiculo = {
      id_marca: selectedMarca,
      modelo,
      anio,
      cedula,
      placa,
      foto: currentImage,
    };

    axios.get("http://10.0.2.2:3001/api/vehiculos")
      .then(response => {
        const vehiculoExistente = response.data.find(v => v.placa === placa && v.cedula === cedula);
        if (vehiculoExistente) {
          Alert.alert("Error", "Vehículo ya registrado.");
        } else {
          axios.post("http://10.0.2.2:3001/api/vehiculos", vehiculo)
          .then(response => {
            setvehiculos([...vehiculos, response.data]);
            Alert.alert("Registro exitoso", "El vehículo ha sido registrado correctamente.");
            onClose();
          })
          .catch(error => {
            
            Alert.alert("Error", "No se pudo registrar el vehículo.");
          });
        }
      })
      .catch(error => {
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
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text
              style={[styles.title, { color: dark ? "#FFFFFF" : "#000000" }]}
            >
              Registro de Vehículo
            </Text>

            <View
              style={[
                styles.inputContainer,
                { backgroundColor: dark ? "#333333" : "#F0F0F0" },
              ]}
            >
              <Text
                style={[
                  styles.cedulaText,
                  { color: dark ? "#FFFFFF" : "#000000" },
                ]}
              >
                Cliente: {cedula}
              </Text>
            </View>

            <View
              style={[
                styles.inputContainer,
                { backgroundColor: dark ? "#333333" : "#F0F0F0" },
              ]}
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

            <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
              <Text style={styles.imageButtonText}>Seleccionar Foto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegistro}
            >
              <Text style={styles.registerButtonText}>Registrar Vehículo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </ScrollView>
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
    maxHeight: "80%",
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    height: 50,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  input: {
    height: 50,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  cedulaText: {
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  imageButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 15,
    alignSelf: "center",
  },
  registerButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  registerButtonText: {
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
