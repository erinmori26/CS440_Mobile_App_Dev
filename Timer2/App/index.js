// react native for mobile, react for web
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Picker,
  Platform
} from "react-native";

const screen = Dimensions.get("window"); // dimensions of window for positioning

// all styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07121B",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    borderWidth: 10,
    borderColor: "#89AAFF",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  buttonStop: {
    borderColor: "#FF851B"
  },
  buttonText: {
    fontSize: 45,
    color: "#89AAFF"
  },
  buttonTextStop: {
    color: "#FF851B"
  },
  timerText: {
    color: "#fff",
    fontSize: 90
  },
  picker: {
    width: 50,
    // for Android-specific style
    ...Platform.select({
      android: {
        color: "#fff",
        backgroundColor: "#07121B",
        marginLeft: 10
      }
    })
  },
  pickerItem: {
    color: "#fff",
    fontSize: 20
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});

/////// CUSTOM METHODS ////////

// 3 => 03, 10 => 10
const formatNumber = number => `0${number}`.slice(-2); // single line = implicit return

// get remaining time (basic math) and format minutes/seconds
const getRemaining = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) }; // basically defining new JSON obj to return
};

// array of numbers for minutes/seconds to display in picker
const createArray = length => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
};

const AVAILABLE_MINUTES = createArray(10);
const AVAILABLE_SECONDS = createArray(60);

/////// APP (like main) ////////
export default class App extends React.Component {
  // starting state of app
  state = {
    remainingSeconds: 5,
    isRunning: false,
    selectedMinutes: "0",
    selectedSeconds: "5"
  };

  interval = null;

  // React lifestyle method (override)
  // timer cannot go below 0 seconds
  // check previous state so no infinite loop (stop function updates state)
  componentDidUpdate(prevProp, prevState) {
    if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
      this.stop();
    }
  }

  // clear to avoid memory leaks
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  // start timer function
  start = () => {
    this.setState(state => ({
      remainingSeconds:
        parseInt(state.selectedMinutes, 10) * 60 + // string --> number, minutes --> seconds
        parseInt(state.selectedSeconds, 10), // add total seconds
      isRunning: true
    }));

    // update state every second
    this.interval = setInterval(() => {
      // pass in method with no parameters that calls this.setState
      this.setState(state => ({
        remainingSeconds: state.remainingSeconds - 1
      }));
    }, 1000);
  };

  // stop timer function
  stop = () => {
    clearInterval(this.interval); // finished with interval (clear memory)
    this.interval = null;
    this.setState({
      remainingSeconds: 5, // default
      isRunning: false
    });
  };

  // create pickers to choose time to set
  renderPickers = () => (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedMinutes}
        onValueChange={itemValue => {
          this.setState({ selectedMinutes: itemValue }); // update state with minutes when changed
        }}
        mode="dropdown"
      >
        {AVAILABLE_MINUTES.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>minutes</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedSeconds}
        onValueChange={itemValue => {
          this.setState({ selectedSeconds: itemValue }); // update state with seconds when changed
        }}
        mode="dropdown"
      >
        {AVAILABLE_SECONDS.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>seconds</Text>
    </View>
  );

  // React lifecycle method (override)
  // render display of app
  render() {
    const { minutes, seconds } = getRemaining(this.state.remainingSeconds);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {// if the timer is running, display time counting down; else display pickers
        this.state.isRunning ? (
          <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
        ) : (
          this.renderPickers()
        )}
        {// if the timer is running, display the stop button; else display the start button
        this.state.isRunning ? (
          <TouchableOpacity
            onPress={this.stop}
            style={[styles.button, styles.buttonStop]}
          >
            <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.start} style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
