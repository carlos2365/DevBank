import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Modal,
  Pressable,
  View,
  Text,
  SectionList,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { colors } from "../res";
import axios from "axios";
import { Icon } from "react-native-elements";
import * as Contacts from "expo-contacts";
import { host } from "../redux/varible_host";

// var contacts = [
//   {
//     eMail: "cuarto@email.com",
//     name: "Cecilia Puente",
//   },
// ];

export default function ContactsScreen(props) {
  var phone;
  const [mobileNumber, setMobileNumber] = useState("");
  const [whatsAppMsg, setWhatsAppMsg] = useState("Unite a la red DevBank");

  const loginUser = useSelector((state) => state.login.loginUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContactVisible, setModalContactVisible] = useState(false);
  const [contacts, setContacts] = useState([]);

  const [email, setEmail] = useState("");
  const [get, setGet] = useState(0);

  const [state, setState] = useState([]);
  var contact;
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          contact = data;
          setState(contact);
        }
      }
    })();
  }, []);

  const mandarMensaje = (telefono) => {
    phone = telefono;
    initiateWhatsApp();
  };

  const initiateWhatsApp = () => {
    // Check for perfect 10 digit length
    if (phone.length < 10) {
      alert("Please insert correct WhatsApp number");
      return;
    }
    // Using 91 for India
    // You can change 91 with your country code
    let url = "whatsapp://send?text=" + whatsAppMsg + "&phone=" + phone;
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened");
      })
      .catch(() => {
        alert("Make sure Whatsapp installed on your device");
      });
  };

  const handleChangeText = (value) => {
    setEmail(value);
  };

  useEffect(() => {
    axios
      .get(`http://${host}:8080/users/contact/${loginUser.id}`)
      .then((data) => {
        setContacts(data.data);
      });
  }, [get]);

  var getData = () => {
    let contactsArr = [];
    let aCode = "A".charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      let currChar = String.fromCharCode(aCode + i);
      let obj = {
        title: currChar,
      };
      let currContacts = contacts.filter((item) => {
        return item.alias[0].toUpperCase() === currChar;
      });
      if (currContacts.length > 0) {
        currContacts.sort((a, b) => a.alias.localeCompaer(b.alias));
        obj.data = currContacts;
        contactsArr.push(obj);
      }
    }
    return contactsArr;
  };

  const transfer = (item) => {
    props.navigation.navigate("SendMoney", item);
  };

  const agregarContacto = () => {
    var dato = {
      email,
    };
    axios
      .post(`http://${host}:8080/users/contact/${loginUser.id}`, dato)
      .then((data) => {
        if (data.data === "ya es un contacto") {
          setModalVisible(!modalVisible);
          Alert.alert("AVISO", "El usuario ya es su contacto");
        } else {
          setModalVisible(!modalVisible);
          Alert.alert("EXITO", "Usuario agregado");
          setGet(Math.random());
        }
      })
      .catch((error) => {
        setModalVisible(!modalVisible);
        Alert.alert("ERROR", "Usuario no existe");
      });
  };

  const eliminarContacto = (contactId) => {
    axios.delete(
      `http://${host}:8080/users/contact/${loginUser.id}/${contactId}`
    );
    Alert.alert("AVISO", "Usuario eliminado");
    setGet(Math.random());
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.header}> Tus Contactos</Text>
        <SectionList
          sections={getData()}
          ListHeaderComponent={() => (
            <View>
              <Button
                title="Agregar Contacto"
                onPress={() => setModalVisible(true)}
              />
              <TouchableOpacity
                style={styles.longButton}
                onPress={() => setModalContactVisible(!modalContactVisible)}
              >
                <Icon name="md-logo-whatsapp" type="ionicon" />
                <Text>Invitar Contacto</Text>
              </TouchableOpacity>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View>
                <Text style={styles.contactNames}>{item.alias}</Text>
              </View>
              <View style={styles.transferBtn}>
                <Button onPress={() => transfer(item)} title="Transferir" />
                <Button
                  color="#ff3464"
                  onPress={() => eliminarContacto(item.contactId)}
                  title="Eliminar"
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.index}
          renderSectionHeader={({ section }) => {
            <View style={styles.sectionHeader}>
              <Text>{section.title}</Text>
            </View>;
          }}
        />
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Ingrese e-mail del contacto a agregar
              </Text>
              <TextInput
                style={styles.email}
                placeholder="E-mail"
                onChangeText={(value) => handleChangeText(value, "email")}
                value={email}
              ></TextInput>
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <View style={{ paddingRight: 30 }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </Pressable>
                </View>
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => agregarContacto()}
                  >
                    <Text style={styles.textStyle}>Agregar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalContactVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalContactVisible(!modalContactVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Seleccione contacto a agregar
              </Text>
              <ScrollView>
                {state.length !== 0 ? (
                  state.map((contact) => (
                    <Text
                      onPress={() =>
                        mandarMensaje(contact.phoneNumbers[0].number)
                      }
                      key={contact.id}
                    >
                      {contact.name} -{" "}
                      {contact.phoneNumbers[0].number
                        ? contact.phoneNumbers[0].number
                        : "Sin número"}
                    </Text>
                  ))
                ) : (
                  <Text>Aqui van los contactos</Text>
                )}
              </ScrollView>
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalContactVisible(!modalContactVisible)}
                  >
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  container: {
    marginTop: 35,
    width: 300,
  },
  header: {
    alignSelf: "center",
    fontSize: 35,
    color: colors.accent,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",

    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    margin: 7,
    paddingLeft: 3,
    backgroundColor: colors.secondary,
  },
  contactNames: {
    fontSize: 20,
    color: colors.primary,
    paddingRight: 30,
  },
  transferBtn: {
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  sectionHeader: {},

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  email: {
    paddingBottom: 20,
  },
  longButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#00ff80",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
});
