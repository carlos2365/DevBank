import React, { useState } from "react";
import { Avatar } from "react-native-elements";
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

  const accountUserLogin = useSelector((state) => state.user.registerData);

  var foto =
    "https://th.bing.com/th/id/OIP.NW8X36eGSsuY8WnXF4BjMwHaHa?w=214&h=214&c=7&o=5&pid=1.7";

  var profilePic =
    "https://th.bing.com/th/id/OIP.NW8X36eGSsuY8WnXF4BjMwHaHa?w=214&h=214&c=7&o=5&pid=1.7";

  if (accountUserLogin[2]) {
    var pos = accountUserLogin.length - 1;
    profilePic = accountUserLogin[pos];
  }

  const [state, setState] = useState({
    phone: loginUser.phone,
    street: loginUser.street,
    location: loginUser.location,
    province: loginUser.province,
    country: loginUser.country,
  });
  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const editProfile = () => {
    var datos = {
      phone: parseInt(state.phone),
      street: state.street,
      location: state.location,
      province: state.province,
      country: state.country,
    };
    axios
      .put(`http://${host}:8080/users/${loginUser.id}`, datos)
      .then((response) => {
        Alert.alert("AVISO", "Pefil Editado");
        props.navigation.navigate("Home");
      });
  };

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
                <Icon name={"qr-code-outline"} size={40} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }}>
              <Avatar
                size="xlarge"
                rounded
                source={{
                  uri: profilePic ? profilePic : foto,
                }}
                onPress={() => props.navigation.navigate("ProfilePic")}
              />
              {/* <View style={styles.largeCircle}>
                <Icon name={"person-circle-outline"} size={70} />
              </View> */}
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.smallCircle}>
                <Icon name={"people-outline"} size={40} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.aliasContainer}>
            <Text style={styles.aliasLabel}>Documento</Text>
            <View style={styles.aliasContainer2}>
              <View>
                <TextInput editable={false} style={styles.aliasContent2}>
                  {loginUser.docType}
                </TextInput>
              </View>
              <View>
                <TextInput editable={false} style={styles.aliasContent2}>
                  {loginUser.docNumber}
                </TextInput>
              </View>
            </View>
          </View>
          <View style={styles.aliasContainer}>
            <Text style={styles.aliasLabel}>Correo</Text>
            <TextInput editable={false} style={styles.aliasContent}>
              {loginUser.email}
            </TextInput>
          </View>
          <View style={styles.aliasContainer}>
            <Text style={styles.aliasLabel}>Teléfono</Text>
            <TextInput
              style={styles.aliasContent}
              mode="flat"
              placeholder="Teléfono"
              underlineColorAndroid={"transparent"}
              onChangeText={(value) => handleChangeText(value, "phone")}
              value={state.phone}
            />
          </View>
          <View style={styles.aliasContainer}>
            <Text style={styles.aliasLabel}>Calle</Text>
            <TextInput
              style={styles.direction}
              mode="flat"
              placeholder="Calle"
              underlineColorAndroid={"transparent"}
              onChangeText={(value) => handleChangeText(value, "street")}
              value={state.street}
            />
          </View>
          <View style={styles.aliasContainer}>
            <Text style={styles.aliasLabel}>Ciudad</Text>
            <TextInput
              style={styles.direction}
              mode="flat"
              placeholder="Ciudad"
              underlineColorAndroid={"transparent"}
              onChangeText={(value) => handleChangeText(value, "location")}
              value={state.location}
            />
          </View>
          <View style={styles.aliasContainer}>
            <Text style={styles.aliasLabel}>Provincia - Estado</Text>
            <TextInput
              style={styles.direction}
              mode="flat"
              placeholder="Estado"
              underlineColorAndroid={"transparent"}
              onChangeText={(value) => handleChangeText(value, "province")}
              value={state.province}
            />
          </View>
          <View style={styles.aliasContainer}>
            <Text style={styles.aliasLabel}>País</Text>
            <TextInput
              style={styles.direction}
              mode="flat"
              placeholder="País"
              underlineColorAndroid={"transparent"}
              onChangeText={(value) => handleChangeText(value, "country")}
              value={state.country}
            />
          </View>
          <TouchableOpacity
            style={styles.longButton}
            onPress={() => {
              editProfile();
            }}
          >
            <Text style={styles.generalDescription}>Editar</Text>
          </TouchableOpacity>
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
    height: 730,
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
    marginTop: 20,
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
  },
  aliasContainer2: {
    flexDirection: "row",
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
  },
});

export default ProfileScreen;
