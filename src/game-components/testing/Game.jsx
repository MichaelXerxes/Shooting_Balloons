import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { PanGestureHandler } from "react-native-gesture-handler";

const boxSize = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  box: {
    position: "absolute",
    width: boxSize,
    height: boxSize,
    backgroundColor: "#FF0000"
  }
});

class Game extends PureComponent {
  box = React.createRef();

  handleGesture = event => {
    const { absoluteX, absoluteY } = event.nativeEvent;

    this.box.current.setNativeProps({
      style: {
        left: absoluteX - boxSize / 2,
        top: absoluteY - boxSize / 2
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <GameEngine>
          <PanGestureHandler onGestureEvent={this.handleGesture}>
            <View style={styles.box} ref={this.box} />
          </PanGestureHandler>
        </GameEngine>
      </View>
    );
  }
}

export default Game;
