import React from "react";
import { TouchableOpacity, Image, StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Details from "./screens/Details";
import Search from "./screens/Search";

// header button - search or close
const HeaderRightButton = (
  { onPress, style, icon } // pass in action, style, and icon
) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={icon}
      resizeMode="contain"
      style={[
        {
          marginRight: 10,
          width: 20,
          height: 20,
          tintColor: "#fff"
        },
        style
      ]}
    />
  </TouchableOpacity>
);

const AppStack = createStackNavigator(
  {
    // details page (weather info)
    Details: {
      screen: Details,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.getParam("title", ""), // show city in title
        headerRight: (
          <React.Fragment>
            {/* add view since can only return one thing*/}
            <StatusBar barStyle="light-content" />
            <HeaderRightButton
              icon={require("./assets/search.png")} // magnifying glass icon
              onPress={() => navigation.navigate("Search")} // navigate to search
            />
          </React.Fragment>
        ),
        headerStyle: {
          backgroundColor: "#3145b7",
          borderBottomColor: "#3145b7"
        },
        headerTintColor: "#fff" // make white header icon
      })
    },

    // search page
    Search: {
      screen: Search,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Search",
        headerRight: (
          <React.Fragment>
            <StatusBar barStyle="dark-content" />
            <HeaderRightButton
              icon={require("./assets/close.png")} // close icon
              onPress={() => navigation.pop()} // go back to previous screen
              style={{ tintColor: "#000" }} // make black header icon
            />
          </React.Fragment>
        ),
        headerLeft: null
      })
    }
  },
  {
    mode: "modal" // screen comes up from bottom
  }
);

export default createAppContainer(AppStack);
