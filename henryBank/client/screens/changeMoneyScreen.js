import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../res/colors";
import { Icon } from "react-native-elements";
import axios from "axios";
import { vaciarReducer, accountUser } from "../redux/user/actions";
import { host } from "../redux/varible_host";

function changeMoneyScreen(props) {
  const dispatch = useDispatch(); // para la futura accion
  const loginUser = useSelector((state) => state.login.loginUser);
  const accountUserLogin = useSelector((redux) => redux.user.registerData);
  const cambio = useSelector((state) => state.cambio.cambio);

  var currencyPESOS,
    currencyDOLARES,
    datos,
    origen,
    destino,
    tipo,
    moneda = "";

  var cvuPESOS,
    cvuDOLARES,
    balancePESOS,
    balanceDOLARES = 0;
  if (accountUserLogin) {
    accountUserLogin.map((p) => {
      if (p.currency === "PESOS") {
        cvuPESOS = p.cvu;
        currencyPESOS = p.currency;
        balancePESOS = p.balance;
      } else if (p.currency === "USD") {
        cvuDOLARES = p.cvu;
        currencyDOLARES = p.currency;
        balanceDOLARES = p.balance;
      }
    });
  }

  useEffect(() => {
    axios
      .get("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
      .then((response) => {
        setState({
          ...state,
          compra: parseFloat(response.data[0].casa.compra),
          venta: (parseFloat(response.data[0].casa.venta) * 1.3 * 1.35).toFixed(
            2
          ),
        });
      });
  }, []);

  const [state, setState] = useState({
    type: "PESOS",
    account: "",
    amount: "",
    description: "",
    currency: "PESOS",
    compra: 0,
    venta: 0,
  });

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const sendMoney = () => {
    if (state.type === "PESOS") {
      origen = cvuPESOS;
      destino = cvuDOLARES;
      tipo = "COMPRA-USD";
      moneda = "PESOS";
    } else if (state.type === "USD") {
      origen = cvuDOLARES;
      destino = cvuPESOS;
      tipo = "VENTA-USD";
      moneda = "USD";
    }
    datos = {
      origin: parseInt(origen),
      destination: parseInt(destino),
      value: parseInt(state.amount),
      type: tipo,
      currency: moneda,
    };
    axios
      .post(`http://${host}:8080/users/transfer/dolar`, datos)
      .then(() => {
        dispatch(vaciarReducer());
      })
      .then(() => {
        Alert.alert("AVISO", "Cambio realizado con exito");
        dispatch(accountUser(loginUser.id, "PESOS"));
        dispatch(accountUser(loginUser.id, "USD"));
        props.navigation.navigate("Home");
        //props.route.params = undefined;
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainContainer}>
        <View style={styles.secondContainer}>
          <Button
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          >
            <Text>Inicio</Text>
          </Button>
          <Text>Cambio Divisas</Text>
          <Icon />
        </View>
        <View style={styles.regform}>
          <ScrollView>
            <View style={styles.cambio}>
              <Text style={styles.monto}>Compra: {state.compra}</Text>
              <Text style={styles.monto}>Venta: {state.venta}</Text>
            </View>
            <Picker
              selectedValue={state.type}
              style={styles.picker}
              onValueChange={(itemValue) => handleChangeText(itemValue, "type")}
            >
              <Picker.Item label="COMPRA DE USD" value="PESOS" />
              <Picker.Item label="VENTA DE USD" value="USD" />
            </Picker>
            <TextInput
              style={styles.textinput}
              placeholder="$ Cantidad de Dolares"
              underlineColorAndroid={"transparent"}
              keyboardType="numeric"
              onChangeText={(value) => handleChangeText(value, "amount")}
              value={state.amount}
            />
            <TouchableOpacity
              style={styles.longButton}
              onPress={() => {
                sendMoney();
              }}
            >
              <Text style={styles.generalDescription}>Enviar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.primary,
    flex: 1,
    alignSelf: "stretch",
  },
  generalDescription: {
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 20,
    alignSelf: "center",
  },
  cambio: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  monto: {
    color: "#fff",
    margin: 15,
    fontSize: 20,
  },
  longButton: {
    width: 250,
    height: 50,
    backgroundColor: "#77C5D5",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  btntext: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#59CBBD",
    marginTop: 30,
    borderRadius: 15,
  },
  secondContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    color: "#fff",
    height: 120,
    backgroundColor: colors.secondary,
  },
  regform: {
    flex: 1,
    padding: 30,
    paddingTop: 60,
    backgroundColor: colors.primary,
    alignSelf: "stretch",
  },
  textinput: {
    alignSelf: "stretch",
    marginBottom: 50,
    backgroundColor: colors.white,
  },
  picker: {
    marginBottom: 50,
    backgroundColor: colors.white,
    color: colors.black,
    borderRadius: 30,
  },
});

export default changeMoneyScreen;
