import React from "react";
import { View } from "react-native";

export default ({ children }) => (
  <View style={{ flexDirection: "row" }}>{children}</View>
);
// children = anything in brackets
// flex direction ensures renders in row
