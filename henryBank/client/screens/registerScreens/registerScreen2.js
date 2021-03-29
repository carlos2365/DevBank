import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Text,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, TextInput } from "react-native-paper";
import { saveRegisterData } from "../../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../res/";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";

export const registerScreen2 = ({ navigation }) => {
  const register = useSelector((state) => state.user.registerData);

  const dispatch = useDispatch();
  const [state, setState] = useState({
    docType: "DNI",
    docNumber: "",
    birthday: "Fecha de Nacimiento",
    phone: "",
    name: register.name,
    lastName: register.lastName,
    email: register.email,
  });

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  //datePicker
  let date = new Date();
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    setShow(false);
    setState({
      ...state,
      birthday: selectedDate
        ? selectedDate.toString().slice(4, 15)
        : state.birthday,
    });
  };
  const showDatepicker = () => {
    setShow(true);
  };
  //
  const checkData = () => {
    if (
      !state.docNumber ||
      !state.phone ||
      state.birthday === "Fecha de Nacimiento"
    ) {
      return Alert.alert("Error", "Debes completar todos los datos");
    }

    if (
      date.toString().slice(11, 15) - parseInt(state.birthday.slice(-4)) <
      16
    ) {
      return Alert.alert("Error", "Debes ser mayor de 16 para crear cuenta");
    }
    return (
      dispatch(saveRegisterData(state, 1)), navigation.navigate("Register3")
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.regform}>
        <View>
          <TouchableOpacity onPress={showDatepicker} style={styles.birthBtn}>
            <Text>{state.birthday}</Text>
            <Icon name={"calendar-outline"} size={40} />
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <Picker
          selectedValue={state.docType}
          style={styles.picker}
          onValueChange={(itemValue) => handleChangeText(itemValue, "docType")}
        >
          <Picker.Item label="DNI" value="DNI" />
          <Picker.Item label="LE" value="LE" />
          <Picker.Item label="LC" value="LC" />
          <Picker.Item label="CI" value="CI" />
        </Picker>

        <TextInput
          style={styles.textinput}
          placeholder="Número de ID"
          underlineColorAndroid={"transparent"}
          keyboardType="numeric"
          onChangeText={(value) => handleChangeText(value, "docNumber")}
          value={state.idNumber}
        />

        <TextInput
          style={styles.textinput}
          placeholder="Número de Telefono"
          underlineColorAndroid={"transparent"}
          keyboardType="numeric"
          onChangeText={(value) => handleChangeText(value, "phone")}
          value={state.phoneNumber}
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
    paddingTop: 50,
    backgroundColor: colors.primary,
    alignSelf: "stretch",
  },
  textinput: {
    alignSelf: "stretch",
    marginBottom: 25,
    backgroundColor: colors.white,
  },
  picker: {
    marginBottom: 25,
    backgroundColor: colors.white,
    color: colors.black,
    borderRadius: 30,
  },
  birthBtn: {
    flexDirection: "row",
    height: 66,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: colors.white,
    borderRadius: 5,
  },
});
