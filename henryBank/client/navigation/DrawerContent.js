import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../res";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";

function DrawerContent(props) {
  const accountUserLogin = useSelector((state) => state.user.registerData);

  const loginUser = useSelector((state) => state.login.loginUser);
  const [darkTheme, setDarkTheme] = React.useState(false);

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };

  var nombre,
    email = "";
  if (loginUser) {
    nombre = loginUser.name + " " + loginUser.lastName;
    email = loginUser.email;
  }

  var foto =
    "https://th.bing.com/th/id/OIP.NW8X36eGSsuY8WnXF4BjMwHaHa?w=214&h=214&c=7&o=5&pid=1.7";

  var profilePic =
    "https://th.bing.com/th/id/OIP.NW8X36eGSsuY8WnXF4BjMwHaHa?w=214&h=214&c=7&o=5&pid=1.7";

  if (accountUserLogin[2]) {
    var pos = accountUserLogin.length - 1;
    profilePic = accountUserLogin[pos];
  }

  if (accountUserLogin[2]) {
    var pos = accountUserLogin.length - 1;
    profilePic = accountUserLogin[pos];
  }

  return (
    <View style={styles.mainContainer}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: profilePic ? profilePic : foto,
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{nombre}</Title>
                <Caption style={styles.caption}>{email}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => <Icon name={"home-outline"} size={28} />}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
              label="Inicio"
            />
            <DrawerItem
              icon={() => <Icon name={"ios-person-outline"} size={28} />}
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
              label="Perfil"
            />
            <DrawerItem
              icon={() => <Icon name={"swap-horizontal-outline"} size={28} />}
              onPress={() => {
                props.navigation.navigate("Cambio");
              }}
              label="Cambio Divisas"
            />
            <DrawerItem
              icon={() => <Icon name={"people-outline"} size={28} />}
              onPress={() => {
                props.navigation.navigate("Contacts");
              }}
              label="Contactos"
            />
          </Drawer.Section>
          <Drawer.Section title="Services">
            <DrawerItem
              icon={() => <Icon name={"receipt-outline"} size={28} />}
              onPress={() => {}}
              label="Facturas"
            />

            <DrawerItem
              icon={() => <Icon name={"shapes-outline"} size={28} />}
              onPress={() => {}}
              label="Prestamos"
            />
          </Drawer.Section>

          <Drawer.Section title="Preferencias">
            <TouchableRipple
              onPress={() => {
                toggleDarkTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Modo oscuro</Text>
                <View pointerEvent="none">
                  <Switch value={darkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              icon={() => <Icon name={"settings-outline"} size={28} />}
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
              label="Ajustes"
            />
            <DrawerItem
              icon={() => <Icon name={"pulse-outline"} size={28} />}
              onPress={() => {
                props.navigation.navigate("Support");
              }}
              label="Soporte"
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => <Icon name={"exit-outline"} size={28} />}
          onPress={() => {}}
          label="Salir"
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingBottom: 5,
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: colors.white,
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
