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
    // Handle button press logic
    console.log(`Button "${buttonText}" pressed`);
    navigation.navigate("Game", { playerImageName: "char2.png" });
  };

  return (
    <ImageBackground
      source={require("../assets/ai-images/endgame.jpg")}
      style={styles.container}
    >
      {/* <ViewGameEngine /> */}
      {/* <CustomGameEngine /> */}

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
            <Text style={styles.buttonText}>Button 2</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("Button 3")}
          >
            <Text style={styles.buttonText}>Button 3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("Button 4")}
          >
            <Text style={styles.buttonText}>Button 4</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("Button 5")}
          >
            <Text style={styles.buttonText}>Button 5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("Button 6")}
          >
            <Text style={styles.buttonText}>Button 6</Text>
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
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 200,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default SelectCharacter;
