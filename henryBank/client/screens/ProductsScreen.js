import React, { useState } from "react";
import { colors } from "../res";
import Icon from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { host } from "../redux/varible_host";

function ProfileScreen(props) {
  const loginUser = useSelector((state) => state.login.loginUser);
  const accountUserLogin = useSelector((redux) => redux.user.registerData);

  const [state, setState] = useState({
    cvuDOLARES: 0,
    cvuPESOS: 0,
    balancePESOS: 0,
    balanceDOLARES: 0,
  });
  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  if (accountUserLogin) {
    accountUserLogin.map((p) => {
      if (p.currency === "PESOS") {
        state.cvuPESOS = p.cvu;
        state.balancePESOS = parseFloat(p.balance).toFixed(2);
      } else if (p.currency === "USD") {
        state.cvuDOLARES = p.cvu;
        state.balanceDOLARES = parseFloat(p.balance).toFixed(2);
      }
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainContainer}>
        <View style={styles.firstContainer}>
          <Text style={styles.userName}>
            {loginUser.name} {loginUser.lastName}
          </Text>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity>
              <View style={styles.smallCircle}>
                <Icon name={"logo-usd"} size={40} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.largeCircle}>
                <Icon name={"cash-outline"} size={70} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.smallCircle}>
                <Icon name={"card-outline"} size={40} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.aliasContainer}>
            <Text style={styles.aliasLabel}>CVU PESOS</Text>
            <View style={styles.aliasContainer2}>
              <View>
                <TextInput editable={false} style={styles.aliasContent2}>
                  {state.cvuPESOS}
                </TextInput>
              </View>
              <View>
                <TextInput editable={false} style={styles.aliasContent2}>
                  $ {state.balancePESOS}
                </TextInput>
              </View>
            </View>
          </View>
          <View style={styles.aliasContainer}>
            <Text style={styles.aliasLabel}>CVU DOLARES</Text>
            <View style={styles.aliasContainer2}>
              <View>
                <TextInput editable={false} style={styles.aliasContent2}>
                  {state.cvuDOLARES}
                </TextInput>
              </View>
              <View>
                <TextInput editable={false} style={styles.aliasContent2}>
                  UDS {state.balanceDOLARES}
                </TextInput>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  direction: {
    color: colors.black,
    fontSize: 15,
    marginLeft: 15,
    marginRight: 15,
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
    marginTop: 15,
  },
  largeCircle: {
    marginHorizontal: 20,
    backgroundColor: colors.secondary,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  smallCircle: {
    backgroundColor: colors.secondary,
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  firstContainer: {
    height: 550,
    width: 375,
    //marginTop: 35,
    alignItems: "center",
    backgroundColor: colors.transpartentWhite,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  userName: {
    marginTop: 30,
    fontWeight: "bold",
    fontSize: 20,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  aliasContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  aliasContainer2: {
    // flexDirection: "row",
  },
  aliasLabel: {
    color: colors.transparentBlack,
    fontSize: 20,
  },
  aliasContent: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 15,
  },
  aliasContent2: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 15,
    marginRight: 15,
    marginTop: 10,
    alignSelf: "center",
  },
});

export default ProfileScreen;
