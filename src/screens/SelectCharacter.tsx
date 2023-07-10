import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { SelectCharacterScreenNavigationProp } from "../types/navigation.types";
import { useIsFocused } from "@react-navigation/native";
import {
  characterOne,
  characterTwo,
  characterThree,
  characterFour,
  characterFive,
  characterSix,
} from "../consts/IMAGES";
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
  const handleButtonPress = (buttonText: string) => {
    console.log(`Button "${buttonText}" pressed`);
    if (buttonText === "Button 1") {
      navigation.navigate("Game", { playerImageName: 0 });
    }
    if (buttonText === "Button 2") {
      navigation.navigate("Game", { playerImageName: 1 });
    }
    if (buttonText === "Button 3") {
      navigation.navigate("Game", { playerImageName: 2 });
    }
    if (buttonText === "Button 4") {
      navigation.navigate("Game", { playerImageName: 3 });
    }
    if (buttonText === "Button 5") {
      navigation.navigate("Game", { playerImageName: 4 });
    }
    if (buttonText === "Button 6") {
      navigation.navigate("Game", { playerImageName: 5 });
    }
  };

  return (
    <ImageBackground
      source={require("../assets/ai-images/Hotpot.png")}
      style={styles.container}
    >
      <View style={styles.container2}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("Button 1")}
          >
            <ImageBackground source={characterOne} style={styles.image} />
            <Text style={styles.buttonText}>Rocket Man</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("Button 2")}
          >
            <ImageBackground source={characterTwo} style={styles.image} />
            <Text style={styles.buttonText}>Blockers</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("Button 3")}
          >
            <ImageBackground source={characterThree} style={styles.image} />
            <Text style={styles.buttonText}>Familly Guy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("Button 4")}
          >
            <ImageBackground source={characterFour} style={styles.image} />
            <Text style={styles.buttonText}>Foxi</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("Button 5")}
          >
            <ImageBackground source={characterFive} style={styles.image} />
            <Text style={styles.buttonText}>Kitti</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("Button 6")}
          >
            <ImageBackground source={characterSix} style={styles.image} />
            <Text style={styles.buttonText}>Drago</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  image: {
    width: 80,
    height: 100,
  },

  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    width: 130,
    margin: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default SelectCharacter;
