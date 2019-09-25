import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  SafeAreaView,
  Dimensions
} from "react-native";
import AnimatedBar from "react-native-animated-bar";

import { Button, ButtonContainer } from "../components/Button";
import { Alert } from "../components/Alert";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between"
  },
  progressBar: {
    width: screen.width - 30,
    backgroundColor: "#6CC644"
  }
});

class Quiz extends React.Component {
  // STATE
  state = {
    correctCount: 0,
    totalCount: this.props.navigation.getParam("questions", []).length,
    activeQuestionIndex: 0,
    answered: false,
    answerCorrect: false,
    //remainingSeconds: 20,
    progress: 0 // track time for question
  };

  // METHOD: set state when question is answered
  answer = correct => {
    this.setState(
      // () => {
      //   this.time();
      // },
      state => {
        const nextState = { answered: true };

        if (correct) {
          nextState.correctCount = state.correctCount + 1; // add to correct count
          nextState.answerCorrect = true; // mark as correct
        } else {
          nextState.answerCorrect = false; // mark as incorrect
        }

        if (this.state.progress >= 1) {
          nextState.answerCorrect = false; // if time runs out, incorrect
        }

        return nextState;
      },
      () => {
        setTimeout(() => this.nextQuestion(), 750); // delay to display image
      }
    );
  };

  // METHOD: move to next question
  nextQuestion = () => {
    this.setState(state => {
      let nextIndex = state.activeQuestionIndex + 1; // move to next question index

      // if answered all questions, go back to quiz index page
      if (nextIndex >= state.totalCount) {
        nextIndex = 0; // reset index to restart loop for next question (important b/c passed into activeQuestionIndex in return)
        this.props.navigation.popToTop();
      }

      return {
        activeQuestionIndex: nextIndex,
        answered: false
      };
    });
  };

  /******************************/
  // start timer function

  time = () => {
    this.setState({
      progress: 0
    });

    // update state every second
    this.interval = setInterval(() => {
      this.setState(state => ({
        progress: state.progress + 0.1
      }));
    }, 1000);
  };

  // timer cannot go above 10 seconds
  // componentDidUpdate() {
  //   if (this.state.progress >= 1) {
  //     () => {
  //       this.nextQuestion();
  //     }; // delay to display image
  //   }
  // }

  // clear to avoid memory leaks
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    this.setState({
      progress: 0
    });

    // update state every second
    this.interval = setInterval(() => {
      this.setState(state => ({
        progress: state.progress + 0.1
      }));
    }, 1000);

    // if (progress >= 1) {
    // }
  }

  // start timer function

  // time = () => {
  //   this.setState({
  //     progress: 0
  //   });

  //   // update state every second
  //   this.interval = setInterval(() => {
  //     this.setState(state => ({
  //       progress: state.progress + 0.1
  //     }));
  //   }, 1000);
  // };

  // METHOD: move to next question
  // timeUp = () => {
  //   this.setState(state => {
  //     let nextIndex = state.activeQuestionIndex + 1; // move to next question index

  //     // if answered all questions, go back to quiz index page
  //     if (nextIndex >= state.totalCount) {
  //       nextIndex = 0; // reset index to restart loop for next question (important b/c passed into activeQuestionIndex in return)
  //       this.props.navigation.popToTop();
  //     }

  //     return {
  //       activeQuestionIndex: nextIndex,
  //       answerCorrect: false,
  //       answered: false,
  //       progress: 0
  //     };
  //   });
  // };

  // timer cannot go above 10 seconds
  // componentDidUpdate() {
  //   if (this.state.progress >= 0.9) {
  //     //this.state.answerCorrect = false;
  //     // Alert(false, true);
  //     setTimeout(() => this.nextQuestion(), 500);
  //     // this.nextQuestion();
  //   }
  // }

  // clear to avoid memory leaks
  // componentWillUnmount() {
  //   if (this.interval) {
  //     clearInterval(this.interval);
  //   }
  // }

  // componentDidMount() {
  //   this.setState({
  //     progress: 0
  //   });

  //   // update state every second
  //   this.interval = setInterval(() => {
  //     this.setState(state => ({
  //       progress: state.progress + 0.1
  //     }));
  //   }, 1000);

  // if (progress >= 1) {
  // }
  //}

  // increase = () => {
  //   this.interval = setInterval(() => {
  //     this.setState(state => ({
  //       progress: state.progress - 1
  //     }));
  //   }, 1000);
  // };

  // this.setState({
  //   [key]: this.state[key] + value,
  // });
  //   };
  // };

  /******************************/

  // screen being mounted
  render() {
    const questions = this.props.navigation.getParam("questions", []); // gets array of questions in category selected
    const question = questions[this.state.activeQuestionIndex]; // gets question at index

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.navigation.getParam("color") } // same color
        ]}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          <View>
            <Text style={styles.text}>{question.question}</Text>

            <ButtonContainer>
              {// get answer array from question object and maps each item to buttton
              // calls answer function when button pressed
              question.answers.map(answer => (
                <Button
                  key={answer.id}
                  text={answer.text}
                  onPress={() => this.answer(answer.correct)}
                />
              ))}
            </ButtonContainer>
          </View>

          {/************************************/}
          <View>
            {/* <ProgressBar
              fillStyle={{}}
              backgroundStyle={{ backgroundColor: "#cccccc", borderRadius: 2 }}
              style={{ marginTop: 10, width: screen.width - 30 }}
              progress={this.state.increase}
            /> */}
            <AnimatedBar
              style={styles.progressBar}
              progress={this.state.progress}
            />
          </View>
          {/************************************/}

          <Text style={styles.text}>
            {// number of current question / total number of questions
            `${this.state.activeQuestionIndex + 1}/${this.state.totalCount}`}
          </Text>
        </SafeAreaView>
        <Alert
          correct={this.state.answerCorrect}
          visible={this.state.answered}
        />
      </View>
    );
  }
}

export default Quiz;
