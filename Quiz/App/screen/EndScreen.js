import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { Button, ButtonContainer } from "../components/Button";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000080",
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    marginTop: 30
  },
  buttonText: {
    color: "#000"
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 15,
    marginLeft: 120,
    alignItems: "center",
    justifyContent: "center"
  }
});

class EndScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Thank you for taking this quiz!</Text>
        <ButtonContainer>
          <TouchableOpacity
            onPress={() => this.props.navigation.popToTop()}
            style={styles.button}
          >
            <Text style={styles.buttonText}> Back to Start </Text>
          </TouchableOpacity>
        </ButtonContainer>
      </View>
    );
  }
}

export default EndScreen;
