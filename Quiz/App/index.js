import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import QuizIndex from "./screen/QuizIndex";
import Quiz from "./screen/Quiz";
import EndScreen from "./screen/EndScreen";

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
  },
  EndScreen: {
    screen: EndScreen,
    navigationOptions: {
      headerTitle: "End"
    }
  }
});

export default createAppContainer(MainStack);
