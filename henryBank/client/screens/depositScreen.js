import React, { useState } from "react";
import { colors } from "../res";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  recargarDinero,
  vaciarReducer,
  accountUser,
} from "../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { host } from "../redux/varible_host";

function DepositScreen(props) {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login.loginUser);
  const accountUserLogin = useSelector((state) => state.user.registerData);

  const [state, setState] = useState({
    amount: "",
    type: "PESOS",
  });

  var cvu,
    currency,
    value = 0;
  if (accountUserLogin) {
    accountUserLogin.map((p) => {
      if (p.currency === state.type) {
        cvu = p.cvu;
        currency = p.currency;
      }
    });
  }

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const dispatchFunction = () => {
    var datos = {
      cvu,
      currency: state.type,
      value: parseInt(state.amount),
    };
    axios
      .post(`http://${host}:8080/users/transfer/deposito`, datos)
      .then(() => {
        dispatch(vaciarReducer());
      })
      .then(() => {
        dispatch(accountUser(loginUser.id, "PESOS"));
        dispatch(accountUser(loginUser.id, "USD"));
        Alert.alert("AVISO", "Recarga Exitosa");
      });
  };

  const validateDeposit = () => {
    if (state.amount < 50) {
      Alert.alert("AVISO", "Recarga mínima de $50");
    } else {
      dispatchFunction();
      props.navigation.navigate("Home");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainContainer}>
        <Text style={styles.generalSumLabel}>Recargar dinero</Text>
        <View style={styles.firstContainer}>
          <Text style={styles.generalDescription}>
            Usá este código siempre que quieras ingresar dinero a tu cuenta.
          </Text>
          <Text style={styles.generalDescription}>
            El monto mínimo es de $50.
          </Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>88333 44526</Text>
          </View>
          <Text style={styles.generalDescription}>
            Mostrale este código al cajero en RapiPago o PagoFacil.
          </Text>

          {/* <Picker
          selectedValue={state.type}
          // style={styles.picker}
          onValueChange={(itemValue) => handleChangeText(itemValue, "type")}
        >
          <Picker.Item label="PESOS" value="PESOS" />
          <Picker.Item label="USD" value="USD" />
        </Picker> */}

          <Picker
            selectedValue={state.type}
            style={styles.picker}
            onValueChange={(itemValue) => handleChangeText(itemValue, "type")}
          >
            <Picker.Item label="PESOS" value="PESOS" />
            <Picker.Item label="USD" value="USD" />
          </Picker>

          <TextInput
            keyboardType="numeric"
            style={styles.montoInput}
            placeholder="Ingrese monto a recargar"
            onChangeText={(value) => handleChangeText(value, "amount")}
            value={state.amount}
          ></TextInput>
          <TouchableOpacity
            style={styles.longButton}
            onPress={() => {
              validateDeposit();
              // dispatchFunction();
              // props.navigation.navigate("Home");
            }}
          >
            <Text style={styles.generalDescription}>Confirmar Recarga</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  firstContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    width: 350,
    height: 550,
    // alignItems: "center",
    justifyContent: "center",
  },
  generalSumLabel: {
    color: "#fff",
    fontSize: 25,
    paddingBottom: 30,
  },
  codeContainer: {
    backgroundColor: "black",
    borderRadius: 10,
    width: 300,
    // height: 500,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40,
    alignSelf: "center",
  },
  codeText: {
    color: "#fff",
    fontSize: 25,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 15,
    paddingTop: 15,
  },
  montoInput: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 20,
  },
  generalDescription: {
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 20,
    alignSelf: "flex-start",
  },
  longButton: {
    marginTop: 40,
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
  picker: {
    marginTop: 15,
    alignSelf: "center",
    width: 200,
    backgroundColor: colors.white,
    color: colors.black,
    borderRadius: 30,
  },
});

export default DepositScreen;
