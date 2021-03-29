import React, { useState } from "react";
import { connect } from "react-redux";
import { saveRegisterData } from "../../redux/user/actions";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { colors } from "../../res/";
import { useDispatch } from "react-redux";

export const registerScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    lastName: "",
    email: "",
  });
  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const checkData = () => {
    if (!state.name || !state.lastName || !state.email) {
      return Alert.alert("Error", "Debes completar todos los datos");
    }
    if (!regEx.test(String(state.email).toLowerCase())) {
      return Alert.alert("Error", "El E-Mail no es válido");
    }
    return (
      dispatch(saveRegisterData(state, 1)), navigation.navigate("Register2")
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.regform}>
        <TextInput
          style={styles.textinput}
          mode="flat"
          placeholder="Nombre"
          underlineColorAndroid={"transparent"}
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Apellido"
          underlineColorAndroid={"transparent"}
          onChangeText={(value) => handleChangeText(value, "lastName")}
          value={state.lastname}
        />
        <TextInput
          style={styles.textinput}
          placeholder="E-Mail"
          underlineColorAndroid={"transparent"}
          onChangeText={(value) => handleChangeText(value, "email")}
          value={state.email}
        />
        <Button mode="contained" onPress={checkData}>
          Continuar
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
  regform: {
    flex: 1,
    padding: 30,
    paddingTop: 100,
    backgroundColor: colors.primary,
    alignSelf: "stretch",
  },
  textinput: {
    alignSelf: "stretch",
    marginBottom: 50,
  },
});

//export default connect(null, saveRegisterData)(registerScreen);
