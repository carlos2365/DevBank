import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../res";
import { menuTransfer } from "../redux/transfer/actions";

function TransferScreen(props) {
  const accounts = useSelector((state) => state.user.registerData);
  const loginUser = useSelector((state) => state.login.loginUser);
  const menutransfer = useSelector((state) => state.transfer.dataTransfer);
  useEffect(() => {
    props.navigation.navigate("Transfer");
  }, [menutransfer]);
  const scrollViewRef = useRef();
  const dispatch = useDispatch();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.secondContainer}>
        <TouchableOpacity
          onPress={() => {
            dispatch(menuTransfer(accounts[1].cvu));
          }}
        >
          <Icon color="#fff" name="sc-telegram" type="evilicon" />
          <Text style={styles.text_icon}>USD</Text>
        </TouchableOpacity>

        <Text style={{ color: "white", fontSize: 30 }}>Transacciones</Text>

        <TouchableOpacity
          onPress={() => {
            dispatch(menuTransfer(accounts[0].cvu));
          }}
        >
          <Icon color="#fff" name="sc-telegram" type="evilicon" />
          <Text style={styles.text_icon}>PESOS</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity        
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          >
            <Icon style={styles.text_icon} name="sc-telegram" type="evilicon" />
            <Text style={styles.text_icon}>Inicio</Text>

          </TouchableOpacity> */}
      </View>
      <View style={styles.thirdContainer}>
        <View style={styles.secondButtonContainer}>
          <ScrollView ref={scrollViewRef}>
            {menutransfer?.map((transfer) => (
              <View
                key={transfer.id}
                style={
                  transfer.type == "DEP"
                    ? styles.general
                    : transfer.origin != accounts[0].cvu
                    ? styles.general
                    : styles.generalT
                }
              >
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <View style={{ alignItems: "center", paddingRight: 40 }}>
                    <Text style={{ color: "black", fontSize: 16.5 }}>
                      {transfer.createdAt.slice(0, 10)}
                    </Text>
                    <Text style={styles.generalSumContent}>
                      {transfer.destination}
                    </Text>
                  </View>
                  <View
                    style={{
                      color: "black",
                      fontSize: 16.5,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.generalSumLabel}>{transfer.type}</Text>
                    <Text style={styles.generalSumLabel}>
                      {transfer.description}
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <Text style={styles.generalSumLabel}>Valor</Text>
                  <Text style={styles.generalSumContent}>
                    $ {transfer.value}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    flex: 1,
    alignSelf: "stretch",
  },

  secondContainer: {
    alignItems: "center",
    borderBottomLeftRadius: 110,
    borderBottomRightRadius: 110,
    flexDirection: "row",
    justifyContent: "space-evenly",
    color: "#fff",
    height: 180,
    backgroundColor: colors.primary,
  },

  thirdContainer: {
    flex: 0.9,
    justifyContent: "space-evenly",
  },

  text_icon: {
    color: "white",
    fontSize: 15,
  },

  secondButtonContainer: {
    alignItems: "center",
    padding: 10,
    height: "100%",
    margin: 20,
    borderRadius: 10,
  },

  general: {
    backgroundColor: "rgb(172, 232, 179)",
    width: 400,
    height: 100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20,
  },

  generalT: {
    backgroundColor: "rgb(216, 168, 168)",
    width: 400,
    height: 100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20,
  },

  generalSumContent: {
    color: "#000",
    fontSize: 16.5,
    paddingRight: 15,
  },

  generalSumLabel: {
    color: "#000",
    paddingBottom: 5,
    paddingRight: 15,
    fontSize: 16.5,
  },

  longButton: {
    width: 220,
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

export default TransferScreen;
