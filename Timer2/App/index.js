/*
 * Name: Erin Morikawa
 * Updated: 9/10/2019
 * CS 440 Project 1: Timer
 */

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
    width: screen.width / 3,
    height: screen.width / 3,
    borderRadius: screen.width / 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderColor: "#FF851B"
  },
  buttonPause: {
    width: screen.width / 3,
    height: screen.width / 3,
    borderRadius: screen.width / 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderColor: "#FFF700"
  },
  buttonStartPause: {
    width: screen.width / 3,
    height: screen.width / 3,
    borderRadius: screen.width / 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderColor: "#89AAFF"
  },
  buttonText: {
    fontSize: 40,
    color: "#89AAFF"
  },
  buttonTextStop: {
    color: "#FF851B"
  },
  buttonTextPause: {
    color: "#FFF700"
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
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor((time - hours * 60 * 60) / 60);
  const seconds = time - hours * 60 * 60 - minutes * 60;
  return {
    hours: formatNumber(hours),
    minutes: formatNumber(minutes),
    seconds: formatNumber(seconds)
  }; // basically defining new JSON obj to return
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

const AVAILABLE_HOURS = createArray(24);
const AVAILABLE_MINUTES = createArray(10);
const AVAILABLE_SECONDS = createArray(60);

/////// APP (like main) ////////
export default class App extends React.Component {
  // starting state of app
  state = {
    remainingSeconds: 5,
    isRunning: false,
    pausePressed: false,
    selectedHours: "0",
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
        parseInt(state.selectedHours, 10) * 60 * 60 +
        parseInt(state.selectedMinutes, 10) * 60 + // string --> number, minutes --> seconds
        parseInt(state.selectedSeconds, 10), // add total seconds
      isRunning: true,
      pausePressed: false
    }));

    // update state every second
    this.interval = setInterval(() => {
      // pass in method with no parameters that calls this.setState
      this.setState(state => ({
        remainingSeconds: state.remainingSeconds - 1
      }));
    }, 1000);
  };

  ////////////// PAUSE timer function ////////////////
  pause = () => {
    clearInterval(this.interval); // finished with interval (clear memory)
    this.interval = null;
    this.setState({
      // set selectedHours/Minutes/Seconds because it's called in the start function
      // set to current remaining time to maintain state
      selectedHours: Math.floor(this.state.remainingSeconds / 60 / 60),
      selectedMinutes: Math.floor(
        (this.state.remainingSeconds -
          Math.floor(this.state.remainingSeconds / 60 / 60) * 60 * 60) /
          60
      ),
      selectedSeconds:
        this.state.remainingSeconds -
        Math.floor(this.state.remainingSeconds / 60 / 60) * 60 * 60 -
        Math.floor(
          (this.state.remainingSeconds -
            Math.floor(this.state.remainingSeconds / 60 / 60) * 60 * 60) /
            60
        ) *
          60,
      isRunning: true,
      pausePressed: true
    });
  };

  // stop timer function
  stop = () => {
    clearInterval(this.interval); // finished with interval (clear memory)
    this.interval = null;
    this.setState({
      remainingSeconds: 5, // default
      selectedHours: "0",
      selectedMinutes: "0",
      selectedSeconds: "5",
      isRunning: false,
      pausePressed: false
    });
  };

  // create pickers to choose time to set
  renderPickers = () => (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedHours}
        onValueChange={itemValue => {
          this.setState({ selectedHours: itemValue }); // update state with hours when changed
        }}
        mode="dropdown"
      >
        {AVAILABLE_HOURS.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>hours</Text>
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
    const { hours, minutes, seconds } = getRemaining(
      this.state.remainingSeconds
    );

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {// if the timer is running, display time counting down; else display pickers
        this.state.isRunning ? (
          <Text
            style={styles.timerText}
          >{`${hours}:${minutes}:${seconds}`}</Text>
        ) : (
          this.renderPickers()
        )}

        {this.state.isRunning ? ( // if the timer is running
          this.state.pausePressed ? ( // if the paused, display start button; else display pause
            // START by STOP
            <TouchableOpacity
              onPress={this.start}
              style={[styles.button, styles.buttonStartPause]}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          ) : (
            // PAUSE
            <TouchableOpacity
              onPress={this.pause}
              style={[styles.button, styles.buttonPause]}
            >
              <Text style={[styles.buttonText, styles.buttonTextPause]}>
                Pause
              </Text>
            </TouchableOpacity>
          )
        ) : (
          // else (timer not running) display nothing (start already displayed below)
          <Text>none</Text>
        )}

        {this.state.isRunning ? ( // if the timer is running, display stop button; else display start
          // STOP
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
