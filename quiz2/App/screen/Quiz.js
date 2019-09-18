import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from "react-native";

import { Button, ButtonContainer } from "../components/Button";
import { Alert } from "../components/Alert";

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
  }
});

class Quiz extends React.Component {
  state = {
    correctCount: 0,
    totalCount: this.props.navigation.getParam("questions", []).length,
    activeQuestionIndex: 0,
    answered: false,
    answerCorrect: false
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

          <Text style={styles.text}>
            {`${this.state.correctCount}/${this.state.totalCount}`}
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
