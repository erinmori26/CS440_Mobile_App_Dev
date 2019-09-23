import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from "react-native";
import ProgressBarAnimated from "react-native-progress-bar-animated"; // for progress bar

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
    backgroundColorOnComplete: "#6CC644"
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
    remainingSeconds: 20
  };

  // METHOD: set state when question is answered
  answer = correct => {
    this.setState(
      state => {
        const nextState = { answered: true };

        if (correct) {
          nextState.correctCount = state.correctCount + 1; // add to correct count
          nextState.answerCorrect = true; // mark as correct
        } else {
          nextState.answerCorrect = false; // mark as incorrect
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
  // // start timer function
  // start = () => {
  //   this.setState(state => ({
  //     remainingSeconds: 20,
  //     isRunning: true,
  //     pausePressed: false
  //   }));

  //   // update state every second
  //   this.interval = setInterval(() => {
  //     // pass in method with no parameters that calls this.setState
  //     this.setState(state => ({
  //       remainingSeconds: state.remainingSeconds - 1
  //     }));
  //   }, 1000);
  // }

  increase = () => {
    this.interval = setInterval(() => {
      // pass in method with no parameters that calls this.setState
      this.setState(state => ({
        remainingSeconds: state.remainingSeconds - 1
      }));
    }, 1000);

    // this.setState({
    //   [key]: this.state[key] + value,
    // });
  };

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
          <ProgressBarAnimated
            style={styles.progressBar}
            onComplete={() => {
              Alert.alert("TODO: SHOW RAN OUT OF TIME AND MOVE ON");
            }}
            value={this.state.progress}
          >
            this.increase.bind(this, 'progress', 20)
          </ProgressBarAnimated>

          {/* <View style={styles.container}>
        <View>
          <Text style={styles.label}>Bar with backgroundColorOnComplete prop</Text>
          <ProgressBarAnimated
            width={barWidth}
            value={this.state.progress}
            backgroundColorOnComplete="#6CC644"
          />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonInner}>
              <Button
                title="Increase 20%"
                onPress={this.increase.bind(this, 'progress', 20)}
              />
            </View>
          </View>
        </View> */}

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
