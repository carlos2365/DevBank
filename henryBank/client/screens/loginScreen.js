import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../res";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import logo from "../assets/logo2.png";
import { useDispatch } from "react-redux";
import { login } from "../redux/login/actions";
const { width: WIDTH } = Dimensions.get("window");
import axios from "axios";
import { host } from "../redux/varible_host";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const [passHidden, setPassHidden] = useState(true);

  const handlePassVisibility = () => {
    setPassHidden(!passHidden);
  };

  const loginFunction = () => {
    axios.post(`http://${host}:8080/users/auth/login`, state).then((data) => {
      if (data.data == "login failed") {
        alert("Usuario o contraseña incorrectos");
      } else {
        dispatch(login(state, 1));
        navigation.navigate("Consolidated");
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.image} />
        </View>

        <View styles={styles.inputContainer}>
          <Icon
            name={"ios-person-outline"}
            size={28}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={"E-Mail"}
            placeholderTextColor={colors.transpartentWhite}
            underlineColorAndroid="transparent"
            onChangeText={(value) => handleChangeText(value, "username")}
            value={state.username}
          />
        </View>

        <View styles={styles.inputContainer}>
          <TouchableOpacity
            style={styles.btnEye}
            onPress={() => {
              handlePassVisibility();
            }}
          >
            <Icon name={"ios-eye-outline"} size={26} color={colors.black} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder={"Contraseña"}
            secureTextEntry={passHidden}
            placeholderTextColor={colors.transpartentWhite}
            underlineColorAndroid="transparent"
            onChangeText={(value) => handleChangeText(value, "password")}
            value={state.password}
          />
        </View>
        <View>
          <Button
            style={styles.btn}
            mode="contained"
            title="Register"
            onPress={() => {
              loginFunction();
            }}
          >
            Log In
          </Button>
        </View>
        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ color: "#fff" }}>
            No tienes cuenta aún? Registrate Acá!
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    opacity: 0.5,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: colors.transparentBlack,
    color: colors.transpartentWhite,
    marginHorizontal: 25,
    marginVertical: 4,
  },
  inputIcon: {
    position: "absolute",
    top: 8,
    left: 37,
  },
  btn: {
    margin: 15,
    width: 150,
    height: 40,
  },
  btnEye: {
    position: "absolute",
    top: 9,
    left: 37,
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    marginTop: "20",
  },
  text: {
    color: colors.transpartentWhite,
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 92,
  },
  registerLink: {
    marginTop: 50,
  },
});
