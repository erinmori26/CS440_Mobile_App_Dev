import React from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

const screen = Dimensions.get("window");
const buttonWidth = screen.width / 4;

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 25
  },
  textSecondary: {
    color: "#060606"
  },
  button: {
    backgroundColor: "#333333",
    flex: 1,
    height: Math.floor(buttonWidth - 10), // not round, so manually round num
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Math.floor(buttonWidth),
    margin: 5
  },
  // buttonDouble: {
  //   width: screen.width / 2 - 10, // factor in margin
  //   flex: 0, // counteract flex from button
  //   alignItems: "flex-start", // text align left in button
  //   paddingLeft: 36
  // },
  buttonSecondary: {
    backgroundColor: "#a6a6a6"
  },
  buttonAccent: {
    backgroundColor: "#f09a36"
  }
});

export default ({ onPress, text, size, theme }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  // if (size === "double") {
  //   buttonStyles.push(styles.buttonDouble); // longer button
  // }

  if (theme === "secondary") {
    buttonStyles.push(styles.buttonSecondary); // gray button
    textStyles.push(styles.textSecondary); // darker text for gray buttons
  } else if (theme === "accent") {
    buttonStyles.push(styles.buttonAccent); // orange button
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};
// render passed in text
