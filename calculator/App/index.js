import React from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";

// import components
import Row from "./components/Row";
import Button from "./components/Button";
import calculator, { initialState } from "./util/calculator";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end" // build up from bottom
  },
  value: {
    color: "#fff",
    fontSize: 40,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10
  },
  operator: {
    color: "#12EE28",
    fontSize: 40,
    textAlignVertical: "top",
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10
  }
});

export default class App extends React.Component {
  state = initialState;

  // Custom Method: Called when any button is pressed.
  // Calculator takes in information about button type and value of button and returns an updated state.
  handleTap = (type, value) => {
    this.setState(state => {
      return calculator(type, value, state);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <Text style={styles.operator}>
            {// display last equation
            this.state.equalPressed == true
              ? this.state.prepreValue +
                " " +
                this.state.opDisplay +
                " " +
                this.state.previousValue +
                " = " +
                this.state.currentValue
              : ""}
          </Text>
          <Text style={styles.operator}>
            {// display selected operator above number (except after = pressed)
            this.state.equalPressed == true ? "" : this.state.opDisplay}
          </Text>
          <Text style={styles.value}>
            {parseFloat(this.state.currentValue)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            /*
             * show num in proper local format
             * BUT shows commas after decimal point
             */
            }
            {/*parseFloat(
              this.state.currentValue
            ).toLocaleString() /*<-- doesn't work for android, doesn't display long decimal num */}
          </Text>
          <Row>
            <Button
              text="C"
              theme="secondary"
              onPress={() => this.handleTap("clear")}
            />
            <Button
              text="+/-"
              theme="secondary"
              onPress={() => this.handleTap("posneg")}
            />
            <Button
              text="%"
              theme="secondary"
              onPress={() => this.handleTap("percentage")}
            />
            <Button
              text="/"
              theme="accent"
              onPress={() => this.handleTap("operator", "/")}
            />
          </Row>

          <Row>
            <Button text="7" onPress={() => this.handleTap("number", 7)} />
            <Button text="8" onPress={() => this.handleTap("number", 8)} />
            <Button text="9" onPress={() => this.handleTap("number", 9)} />
            <Button
              text="x"
              theme="accent"
              onPress={() => this.handleTap("operator", "*")}
            />
          </Row>

          <Row>
            <Button text="4" onPress={() => this.handleTap("number", 4)} />
            <Button text="5" onPress={() => this.handleTap("number", 5)} />
            <Button text="6" onPress={() => this.handleTap("number", 6)} />
            <Button
              text="-"
              theme="accent"
              onPress={() => this.handleTap("operator", "-")}
            />
          </Row>

          <Row>
            <Button text="1" onPress={() => this.handleTap("number", 1)} />
            <Button text="2" onPress={() => this.handleTap("number", 2)} />
            <Button text="3" onPress={() => this.handleTap("number", 3)} />
            <Button
              text="+"
              theme="accent"
              onPress={() => this.handleTap("operator", "+")}
            />
          </Row>

          <Row>
            <Button
              text="√"
              theme="accent"
              onPress={() => this.handleTap("squareroot", "√")}
            />
            <Button text="0" onPress={() => this.handleTap("number", 0)} />
            <Button text="." onPress={() => this.handleTap("number", ".")} />
            <Button
              text="="
              theme="accent"
              onPress={() => this.handleTap("equal")}
            />
          </Row>
        </SafeAreaView>
      </View>
    );
  }
}
