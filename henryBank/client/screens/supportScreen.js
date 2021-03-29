import React from "react";
import { colors } from "../res";
import { View, StyleSheet, Text } from "react-native";

function SupportScreen() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.secondContainer}>
        <Text>Contactanos via email: </Text>
        <Text>support@devbank.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  secondContainer: {
    width: 250,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 10,
  },
});

export default SupportScreen;
