import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
} from "react-native";
import { SelectCharacterScreenNavigationProp } from "../types/navigation.types";
import { useIsFocused } from "@react-navigation/native";
import ViewGameEngine from "../game-components/testing/ViewGameEngine";
import CustomGameEngine from "../game-Engine/CustomGameEngine";
interface Props {
  navigation: SelectCharacterScreenNavigationProp;
}
const { height, width } = Dimensions.get("window");
const SelectCharacter: React.FC<Props> = ({ navigation }) => {
  const animMiddle = useRef(new Animated.Value(0)).current;
  const anim1 = useRef(new Animated.Value(-500)).current;
  const anim2 = useRef(new Animated.Value(500)).current;
  const anim3 = useRef(new Animated.Value(-500)).current;
  const isFocused = useIsFocused();

  return (
    <ImageBackground
      source={require("../assets/ai-images/endgame.jpg")}
      style={styles.container}
    >
      {/* <ViewGameEngine /> */}
      <CustomGameEngine />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "pink",
    position: "absolute",
    width: width,
    height: height,
  },
  ballContainer: {
    marginBottom: 20,
  },
  category1: {
    alignSelf: "flex-start",
  },
  category2: {
    alignSelf: "flex-end",
  },
  category3: {
    // alignSelf: "center",
  },
});
export default SelectCharacter;
