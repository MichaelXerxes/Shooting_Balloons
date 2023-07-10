import React from "react";
import { View, StyleSheet,ImageBackground } from "react-native";

const BallS = ({ position, radius, color }) => {
  const ballStyle = {
    position: "absolute",
    left: position[0] - radius,
    top: position[1] - radius,
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    backgroundColor: "transparent",
  };

  return <View style={ballStyle} >
     <ImageBackground
        source={require("../../assets/monsters/mon2.png")}
        style={styles.box}
      />
  </View>;
};
const styles=StyleSheet.create({
  box:{
    width:50,height:50
  }
})

export default BallS;
