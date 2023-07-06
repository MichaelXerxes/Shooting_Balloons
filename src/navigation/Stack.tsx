import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Game from "../screens/Game";
import Home from "../screens/Home";
import SelectCharacter from "../screens/SelectCharacter";
import TopBarComponent from "../components/TopBarComponent";
import drawerStore from "../mobx/DrawerStore";
import {
  EndGameScreenNavigationProp,
  SettingsScreenNavigationProp,
  UniversalNavigationProps,
} from "../types/navigation.types";

const Stack = createStackNavigator();

const MainStackNavigator: React.FC = () => {
  const navigationSettings = useNavigation<SettingsScreenNavigationProp>();
  const navigationEndGame = useNavigation<UniversalNavigationProps>();
  const { openDrawer } = drawerStore;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => (
            <TopBarComponent navigation={navigationSettings} title="Quizzes" />
          ),
          headerStyle: {
            backgroundColor: "green",
          },
          headerTintColor: "white",
          headerTitleStyle: { fontSize: 24 },
        }}
      />
      <Stack.Screen
        name="SelectCharacter"
        component={SelectCharacter}
        options={{
          header: () => (
            <TopBarComponent
              navigation={navigationSettings}
              title="Select Character"
            />
          ),
        }}
      />
      {/* <Stack.Screen
        name="Settings"
        options={{
          header: () => (
            <TopBarComponent navigation={navigationSettings} title="Settings" />
          ),
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: { fontSize: 24 },
        }}
      >
        {(props) => <Settings {...props} />}
      </Stack.Screen> */}
      {/* <Stack.Screen
        name="Scores"
        component={Scores}
        options={{
          header: () => (
            <TopBarComponent navigation={navigationSettings} title="Scores" />
          ),
        }}
      /> */}
      <Stack.Screen
        name="Game"
        component={Game}
        options={{
          header: () => (
            <TopBarComponent navigation={navigationSettings} title="Game" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
