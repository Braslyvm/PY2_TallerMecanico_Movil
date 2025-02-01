import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

import translateText from "./translate";
import { useGlobalContext } from "./GlobalContext";
import axios from "axios";

export default function RegistroVehiculo({ navigation }) {
  // variables de formulario
  const [id_marca, setid] = useState("");
  const [nodelo, setmodelo] = useState("");
  const [aniom, setanio] = useState("");
  const [cedulac, setCedula] = useState("");
  const [placaV, setplaca] = useState("");
  // variable de consuta
  const [id_marca, setid] = useState("");
  const [nodelo, setmodelo] = useState("");
  const [aniom, setanio] = useState("");
  const [cedulac, setCedula] = useState("");
  const [placaV, setplaca] = useState("");

  /*CREATE TABLE vehiculos (
    id_vehiculo INTEGER PRIMARY KEY AUTOINCREMENT,
    id_marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    anio INTEGER NOT NULL,
    cedula INTEGER NOT NULL,
    placa TEXT,
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca),
    FOREIGN KEY (cedula) REFERENCES clientes(cedula)
); */
}
