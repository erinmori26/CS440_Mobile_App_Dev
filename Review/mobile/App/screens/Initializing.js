import React from "react";

import { hasAuthToken } from "../util/api";

export default class Initializing extends React.Component {
  componentDidMount() {
    hasAuthToken().then(hasToken => {
      if (hasToken) {
        // already logged in
        this.props.navigation.navigate("Information");
      } else {
        // go to sign-in page
        this.props.navigation.navigate("Auth");
      }
    });
  }

  // screen only up for a moment
  render() {
    return null;
  }
}
