import React from "react";
import { ActivityIndicator } from "react-native";

import { List, ListItem } from "../components/List";
import { geoFetch } from "../util/api";

class ListScreen extends React.Component {
  state = {
    loading: true,
    list: []
  };

  componentDidMount() {
    geoFetch("/geocache/list")
      .then(response => {
        console.log("MOUNTED");
        this.setState({
          loading: false,
          list: response.result // display cache items
        });
      })
      .catch(error => {
        console.log("list error", error);
      });
  }

  render() {
    if (this.state.loading) {
      console.log("LOADING");
      return <ActivityIndicator size="large" />;
    }

    console.log("RETURNING");
    return (
      <List
        data={this.state.list}
        renderItem={({ item, index }) => (
          <ListItem
            title={item.title}
            isOdd={index % 2}
            onPress={() => this.props.navigation.navigate("Details", { item })}
          />
        )}
      />
    );
  }
}

export default ListScreen;
