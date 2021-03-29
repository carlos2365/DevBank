import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../res/";
import { Button, TextInput } from "react-native-paper";

export const confirmEmailScreen = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.secondContainer}>
        <Text style={styles.textStyle}>Confirme email</Text>
      </View>
      <TouchableOpacity
        style={{
          width: 100,
          height: 60,
          backgroundColor: "#59CBBD",
          justifyContent: "space-evenly",
          alignSelf: "center",
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={{ color: "#fff" }}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  secondContainer: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 15,
    height: 150,
    margin: 25,
  },
  textStyle: {
    color: colors.white,
    alignSelf: "center",
  },
});
