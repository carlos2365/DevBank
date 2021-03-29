import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ConsolidateScreen from "./ConsolidateScreen";
import ProfileScreen from "./profileScreen";
import DrawerContent from "../navigation/DrawerContent";
import SupportScreen from "./supportScreen";
import DepositScreen from "./depositScreen";
import SettingsScreen from "./settingsScreens";
import MenuMoneyScreen from "./menuMoneyScreen";
import SendMoneyScreen from "./sendMoneyScreen";
import SendMoneyScreen2 from "./sendMoneyScreen2";
import TransferScreen from "./transferScreen";
import ContactsScreen from "./contactsScreen";
import ProfilePicScreen from "./profilePicScreen";
import CameraScreen from "./cameraScreen";
import changeMoneyScreen from "./changeMoneyScreen";
import ProductsScreen from "./ProductsScreen";
import StatsScreen from "./statsScreen";

const Drawer = createDrawerNavigator();

//

export const homeScreen = (props) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={ConsolidateScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />
      <Drawer.Screen name="Deposit" component={DepositScreen} />
      <Drawer.Screen name="MenuMoney" component={MenuMoneyScreen} />
      <Drawer.Screen name="Transfer" component={TransferScreen} />
      <Drawer.Screen name="SendMoney" component={SendMoneyScreen} />
      <Drawer.Screen name="SendMoney2" component={SendMoneyScreen2} />
      <Drawer.Screen name="Contacts" component={ContactsScreen} />
      <Drawer.Screen name="ProfilePic" component={ProfilePicScreen} />
      <Drawer.Screen name="Camera" component={CameraScreen} />
      <Drawer.Screen name="Cambio" component={changeMoneyScreen} />
      <Drawer.Screen name="Products" component={ProductsScreen} />
      <Drawer.Screen name="Stats" component={StatsScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({});
