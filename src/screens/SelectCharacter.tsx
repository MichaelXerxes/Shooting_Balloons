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

  useEffect(() => {
    const animation =
      //Animated.loop(
      Animated.parallel([
        Animated.spring(anim1, {
          toValue: 0,
          useNativeDriver: false,
          speed: 0.05,
        }),
        Animated.spring(anim2, {
          toValue: 0,
          useNativeDriver: false,
          speed: 1,
        }),
        Animated.spring(anim3, {
          toValue: 0,
          useNativeDriver: false,
          speed: 1,
        }),
      ]);

    // );

    const middleAnimation = Animated.loop(
      Animated.sequence([
        Animated.delay(2000),
        Animated.timing(anim2, {
          toValue: -120,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(anim2, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    );

    if (isFocused) {
      animation.start(() => middleAnimation.start());
    }
    //  else {
    //   animation.stop();
    // }

    return () => {
      animation.stop();
      middleAnimation.stop();
      anim1.setValue(-500);
      anim2.setValue(500);
      anim3.setValue(-500);
      animMiddle.setValue(0);
    };
  }, [anim1, anim2, anim3, isFocused]);
  return (
    <ImageBackground
      source={require("../assets/ai-images/endgame.jpg")}
      style={styles.container}
    >
      {/* <Ball2 /> */}
      {/* <View style={styles.container}> */}
      <ViewGameEngine />
      {/* </View> */}
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
