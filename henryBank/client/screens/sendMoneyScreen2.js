import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
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
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

function SendMoneyScreen2(props) {
  const dispatch = useDispatch(); // para la futura accion
  const loginUser = useSelector((state) => state.login.loginUser);
  const accountUserLogin = useSelector((redux) => redux.user.registerData);

  // const [state, setState] = useState({
  //   type: "PESOS",
  //   account: "",
  //   amount: "",
  //   description: "",
  // });

  var currencyPESOS,
    currencyDOLARES,
    datos = "";

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

  const [state, setState] = useState({
    type: "PESOS",
    account: "",
    amount: "",
    description: "",
    cvu: cvuPESOS,
    currency: "PESOS",
  });

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
    if (name === "type") {
      value === "PESOS"
        ? setState({
            ...state,
            type: "PESOS",
            // account: props.route.params.cvu_pesos,
            cvu: cvuPESOS,
            currency: currencyPESOS,
          })
        : setState({
            ...state,
            type: "USD",
            // account: props.route.params.cvu_dolares,
            cvu: cvuDOLARES,
            currency: currencyDOLARES,
          });
    }
  };

  const sendMoney = () => {
    datos = {
      origin: parseInt(state.cvu),
      destination: parseInt(state.account),
      value: parseInt(state.amount),
      type: "TRANSFER",
      currency: state.currency,
      description: state.description,
    };
    axios
      .post(`http://${host}:8080/users/transfer/transfer`, datos)
      .then(() => {
        dispatch(vaciarReducer());
      })
      .then(() => {
        dispatch(accountUser(loginUser.id, "PESOS"));
        dispatch(accountUser(loginUser.id, "USD"));
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
          <Text>Transferencias</Text>
          <Icon />
        </View>
        <View style={styles.regform}>
          <ScrollView>
            <Picker
              selectedValue={state.type}
              style={styles.picker}
              onValueChange={(itemValue) => handleChangeText(itemValue, "type")}
            >
              <Picker.Item label="PESOS" value="PESOS" />
              <Picker.Item label="USD" value="USD" />
            </Picker>
            <TextInput
              style={styles.textinput}
              placeholder="CVU"
              underlineColorAndroid={"transparent"}
              keyboardType="numeric"
              onChangeText={(value) => handleChangeText(value, "account")}
              value={state.account}
            />
            <TextInput
              style={styles.textinput}
              placeholder="$ Amount"
              underlineColorAndroid={"transparent"}
              keyboardType="numeric"
              onChangeText={(value) => handleChangeText(value, "amount")}
              value={state.amount}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Descripci??n"
              underlineColorAndroid={"transparent"}
              onChangeText={(value) => handleChangeText(value, "description")}
              value={state.description}
            />
            <TouchableOpacity
              style={styles.longButton}
              onPress={() => {
                sendMoney();
                props.navigation.navigate("Home");
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

export default SendMoneyScreen2;
