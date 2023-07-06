import React, { useRef, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { DrawerLayoutAndroid } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import drawerStore from "./src/mobx/DrawerStore";

import MainStackNavigator from "./src/navigation/Stack";
import NavigationView from "./src/navigation/Drawer";
const DrawerView = createDrawerNavigator();
export default function App() {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const { drawerPosition, setDrawerRef } = drawerStore;
  useEffect(() => {
    drawerStore.setDrawerRef(drawer);
  }, []);
  return (
    <NavigationContainer>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={() => <NavigationView drawer={drawer} />}
      >
        <MainStackNavigator />
      </DrawerLayoutAndroid>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
