import React from "react";
import { Icon } from "react-native-elements";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { colors } from "../res";

function MenuMoneyScreen(props) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.secondContainer}>
        <Text>Transferencias</Text>
      </View>
      <View style={styles.thirdContainer}>
        <View style={styles.secondButtonContainer}>
          <TouchableOpacity
            style={styles.longButton}
            onPress={() => {
              props.navigation.navigate("SendMoney2");
            }}
          >
            <Text>No inscritos Henrybank</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.longButton}
            onPress={() => {
              props.navigation.navigate("Contacts");
            }}
          >
            <Text>Propios e inscritos Henrybank</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.longButton}
            onPress={() => alert("En desarrollo")}
          >
            <Text>Inscritos de otros bancos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.primary,
    flex: 1,
    alignSelf: "stretch",
  },

  secondContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    color: "#fff",
    height: 140,
    backgroundColor: colors.secondary,
  },

  thirdContainer: {
    flex: 0.9,
    justifyContent: "space-evenly",
  },

  secondButtonContainer: {
    alignItems: "center",
    padding: 10,
    height: 400,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  longButton: {
    width: 290,
    height: 70,
    backgroundColor: "#77C5D5",
    justifyContent: "space-evenly",
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default MenuMoneyScreen;
