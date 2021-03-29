import React from "react";
import { colors } from "../res";
import { View, Text, StyleSheet } from "react-native";

function SettingsScreens() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.secondContainer}>
        <Text>This is the Settings Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  secondContainer: {
    width: 250,
    height: 150,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default SettingsScreens;
