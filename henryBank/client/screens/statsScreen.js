import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../res";
import axios from "axios";
import { host } from "../redux/varible_host";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { RadioButton } from "react-native-paper";

function StatsScreen() {
  const loginUser = useSelector((state) => state.login.loginUser);
  const [ingresos, setIngresos] = useState([0]);
  const [egresos, setEgresos] = useState([0]);
  const [checked, setChecked] = useState("first");

  var date = new Date();
  var date1 = new Date(date);
  var date2 = new Date(date);
  var date3 = new Date(date);
  var date4 = new Date(date);
  var date5 = new Date(date);
  date1.setMonth(date.getMonth() - 5);
  date2.setMonth(date.getMonth() - 4);
  date3.setMonth(date.getMonth() - 3);
  date4.setMonth(date.getMonth() - 2);
  date5.setMonth(date.getMonth() - 1);

  useEffect(() => {
    var currency;
    if (checked === "first") {
      currency = "PESOS";
    } else currency = "USD";

    axios
      .get(`http://${host}:8080/users/account/${loginUser.id}/${currency}`)
      .then((res) => {
        axios
          .get(`http://${host}:8080/users/statistics/${res.data.cvu}/months`)
          .then((data) => {
            setIngresos(Object.values(data.data.ingresos).reverse());
            setEgresos(Object.values(data.data.egresos).reverse());
          });
      });
  }, [checked]);

  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 0.1, flexDirection: "row", marginTop: 30 }}>
        <Text style={{ color: "#fff" }}>PESOS</Text>
        <RadioButton
          value="first"
          status={checked === "first" ? "checked" : "unchecked"}
          onPress={() => setChecked("first")}
        />
        <Text style={{ color: "#fff" }}>USD</Text>
        <RadioButton
          value="second"
          status={checked === "second" ? "checked" : "unchecked"}
          onPress={() => setChecked("second")}
        />
      </View>
      <View style={styles.secondContainer}>
        <Text style={styles.textStyle}>GASTOS </Text>
        <LineChart
          data={{
            labels: [
              date1.getMonth() + 1,
              date2.getMonth() + 1,
              date3.getMonth() + 1,
              date4.getMonth() + 1,
              date5.getMonth() + 1,
              date.getMonth() + 1,
            ],
            datasets: [
              {
                data: egresos,
              },
            ],
          }}
          width={Dimensions.get("window").width - 20} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#77C5D5",
            backgroundGradientFrom: "#77C5D5",
            backgroundGradientTo: "#77D5F0",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View style={styles.thirdContainer}>
        <Text style={styles.textStyle}>INGRESOS </Text>
        <LineChart
          data={{
            labels: [
              date1.getMonth() + 1,
              date2.getMonth() + 1,
              date3.getMonth() + 1,
              date4.getMonth() + 1,
              date5.getMonth() + 1,
              date.getMonth() + 1,
            ],
            datasets: [
              {
                data: ingresos,
              },
            ],
          }}
          width={Dimensions.get("window").width - 20} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#77C5D5",
            backgroundGradientFrom: "#77C5D5",
            backgroundGradientTo: "#77D5F0",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
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
    flex: 1,
    width: "90%",
    marginVertical: 30,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 10,
  },
  thirdContainer: {
    flex: 1,
    width: "90%",
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 10,
  },
  textStyle: {
    marginBottom: 5,
    color: colors.black,
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default StatsScreen;
