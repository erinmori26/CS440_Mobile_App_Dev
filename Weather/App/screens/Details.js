import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text
} from "react-native";
import { format } from "date-fns";

import { weatherApi } from "../util/weatherApi";
import { Container } from "../components/Container";
import { WeatherIcon } from "../components/WeatherIcon";
import { BasicRow } from "../components/List";
import { H1, H2, P } from "../components/Text";
import { addRecentSearch } from "../util/recentSearch";

////////////////////
const styles = StyleSheet.create({
  temp: {
    tintColor: "#fff",
    marginTop: 20
  }
});
/////////////////////

const groupForecastByDay = list => {
  const data = {};

  list.forEach(item => {
    // loop over each day
    const [day] = item.dt_txt.split(" "); // get just day (not time)

    // if data of day already exists
    if (data[day]) {
      // if current temp max < temp max, set it as max
      if (data[day].temp_max < item.main.temp_max) {
        data[day].temp_max = item.main.temp_max;
      }

      // if current temp min > temp min, set it as max
      if (data[day].temp_min > item.main.temp_min) {
        data[day].temp_min = item.main.temp_min;
      }
    } else {
      // if data of day does not exist, set it
      data[day] = {
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max
      };
    }
  });

  // list of days with min and max
  const formattedList = Object.keys(data).map(key => ({
    day: key,
    ...data[key]
  }));

  return formattedList;
};

export default class Details extends React.Component {
  state = {
    currentWeather: {},
    loadingCurrentWeather: true, // flag for loading container
    forecast: [],
    loadingForecast: true, // flag for loading container
    newTemp: 0, // PLACEHOLDER FOR NEW TEMP
    degreeMetric: "F" // start with Fahrenheit
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      // key = coords, value = lat/lon
      this.getCurrentWeather({ coords: position.coords }); // weather
      this.getForecast({ coords: position.coords }); // forecast
    });
  }

  componentDidUpdate(prevProps) {
    // get weather/forecast from recently selected zipcode
    const oldLat = prevProps.navigation.getParam("lat");
    const lat = this.props.navigation.getParam("lat");

    const oldLon = prevProps.navigation.getParam("lon");
    const lon = this.props.navigation.getParam("lon");

    const oldZipcode = prevProps.navigation.getParam("zipcode");
    const zipcode = this.props.navigation.getParam("zipcode");

    // prevent infinite loop
    if (lat && oldLat !== lat && lon && oldLon !== lon) {
      this.getCurrentWeather({ coords: { latitude: lat, longitude: lon } });
      this.getForecast({ coords: { latitude: lat, longitude: lon } });
    } else if (zipcode && oldZipcode !== zipcode) {
      this.getCurrentWeather({ zipcode });
      this.getForecast({ zipcode });
    }
  }

  // when passed invalid zipcode
  handleError = () => {
    Alert.alert("No location data found!", "Please try again", [
      {
        text: "Okay",
        // open search for user
        onPress: () => this.props.navigation.navigate("Search")
      }
    ]);
  };

  // use weather API
  getCurrentWeather = ({ zipcode, coords }) =>
    weatherApi("/weather", { zipcode, coords })
      .then(response => {
        // when 404: city not found error
        if (response.cod === "404") {
          this.handleError();
        } else {
          this.props.navigation.setParams({ title: response.name }); // show city being shown
          this.setState({
            currentWeather: response,
            loadingCurrentWeather: false,
            newTemp: response.main.temp,
            degreeMetric: "F" // start with Fahrenheit
          });
          // add search to search history
          addRecentSearch({
            id: response.id,
            name: response.name,
            lat: response.coord.lat,
            lon: response.coord.lon
          });
        }
      })
      .catch(err => {
        console.log("current error", err);
        this.handleError();
      });

  // use weather API
  getForecast = ({ zipcode, coords }) =>
    weatherApi("/forecast", { zipcode, coords })
      .then(response => {
        // when NOT 404: city not found error
        if (response.cod !== "404") {
          this.setState({
            loadingForecast: false,
            forecast: groupForecastByDay(response.list) // forecast of week
          });
        }
      })
      .catch(err => {
        console.log("forecast error", err);
        this.handleError(); // CHECK: error message same?
      });

  //////////////////
  convert = () => {
    curTemp = this.state.newTemp;

    if (this.state.degreeMetric == "F") {
      CTemp = (curTemp - 32) * (5 / 9);
      this.setState({
        newTemp: CTemp,
        degreeMetric: "C" // now degrees in Celsius
      });
    } else if (this.state.degreeMetric == "C") {
      FTemp = curTemp * (9 / 5) + 32;
      this.setState({
        newTemp: FTemp,
        degreeMetric: "F" // now degrees in Fahrenheit
      });
    } else {
      this.setState({
        newTemp: curTemp
      });
    }
  };
  //////////////////

  render() {
    // show weather is loading (loading circle)
    if (this.state.loadingCurrentWeather || this.state.loadingForecast) {
      return (
        <Container>
          <ActivityIndicator color="#fff" size="large" />
        </Container>
      );
    }

    // pull current weather details (destructure)
    const { weather, main } = this.state.currentWeather;

    return (
      <Container>
        <ScrollView>
          <SafeAreaView>
            <WeatherIcon icon={weather[0].icon} />

            {/*********************************** */}
            <BasicRow>
              <Text style={{ color: "#fff", marginTop: 20 }}>
                Click the temperature to switch between C/F
              </Text>
            </BasicRow>
            <TouchableOpacity
              style={styles.temp}
              onPress={() => this.convert()}
            >
              <H1>
                {`${Math.round(this.state.newTemp)}°`}
                {this.state.degreeMetric}
              </H1>
            </TouchableOpacity>
            {/*********************************** */}

            <BasicRow>
              <H2>{`Humidity: ${main.humidity}%`}</H2>
            </BasicRow>
            <BasicRow>
              <H2>{`Low: ${Math.round(main.temp_min)}°`}</H2>
              <H2>{`High: ${Math.round(main.temp_max)}°`}</H2>
            </BasicRow>

            {/* takes item and maps across days to display in list */}
            <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
              {this.state.forecast.map(day => (
                <BasicRow
                  key={day.day}
                  style={{ justifyContent: "space-between" }}
                >
                  <P>{format(new Date(day.day), "MMMM dd, yyyy")}</P>
                  <View style={{ flexDirection: "row" }}>
                    <P style={{ fontWeight: "700", marginRight: 10 }}>
                      {Math.round(day.temp_max)}
                    </P>
                    <P>{Math.round(day.temp_min)}</P>
                  </View>
                </BasicRow>
              ))}
            </View>
          </SafeAreaView>
        </ScrollView>
      </Container>
    );
  }
}
