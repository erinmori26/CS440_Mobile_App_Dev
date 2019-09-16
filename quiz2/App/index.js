import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import QuizIndex from "./screen/QuizIndex";
import Quiz from "./screen/Quiz";

const MainStack = createStackNavigator({
  QuizIndex: {
    screen: QuizIndex,
    navigationOptions: {
      headerTitle: "Quizzes"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.getParam("title"),
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: navigation.getParam("color"), // set same color
        borderBottomColor: navigation.getParam("color") // set same color
      }
    })
  }
  // Home: {
  //   screen: QuizIndex,
  //   navigationOptions: {
  //     headerTitle: "Quizzes"
  //   }
  // }
});

// const xxx = StackNavigator({
//   Home: { screen: QuizIndex }
// });

// AppRegistry.registerComponent("Quiz", () => MainStack);

export default createAppContainer(MainStack);
