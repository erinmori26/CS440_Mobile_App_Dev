import React from "react";
import { View } from "react-native";

/***** Items should be distributed horizontally *****/

export default ({ children }) => (
  <View style={{ flexDirection: "row" }}>{children}</View>
);
// children = anything in row tags (<Row>___</Row>)
// flex direction ensures renders in row
