import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { Button, ButtonContainer } from "../components/Button";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    color: "#000000",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between"
  }
});

class EndScreen extends React.Component {
  render() {
    //const totalCorrect = this.props.navigation.getParam("Quiz", []);

    return (
      <View style={styles.container}>
        <Text> Thank you for taking this quiz! </Text>

        <ButtonContainer>
          <Button
            text="Back to start"
            onPress={() => this.props.navigation.popToTop()}
          />
        </ButtonContainer>
      </View>
    );
  }
}

export default EndScreen;
