import React from "react";
import { View, StyleSheet } from "react-native";

export const Container = ({ children, style = {} }) => (
  <View style={[{ flex: 1 }, style]}>{children}</View>
);
