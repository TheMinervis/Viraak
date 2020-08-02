import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';

const PossibleRoutes = (props) => {
  const [loading, setLoading] = useState(true);
  const [route_coordinates, setRouteCoordinationCar] = useState([]);
  const [route_coordinatesBus, setRouteCoordinationCarBus] = useState([]);
  const [route_coordinatesBike, setRouteCoordinationBike] = useState([]);
  const locations = useSelector((state) => state.location);
  const modes = props.route.params.mode;
  // console.log(modes);
  // const getTraffic = async () => {
  //   console.log(locations.destination);
  //   try {
  //     const res = await axios.get(
  //       `https://api.tomtom.com/traffic/services/4/incidentDetails/s3/${parseFloat(
  //         locations.pickup.latitude
  //       )},${parseFloat(locations.pickup.longitude)},${parseFloat(
  //         locations.destination.latitude
  //       )},${parseFloat(
  //         locations.destination.longitude
  //       )}/10/-1/json?key=1pGhLtXEeT05VozCGFfQu5pXyG6TeWGn`
  //     );
  //     console.log(res.data['tm']['poi'], 'data');
  //   } catch (er) {
  //     console.log(er.response.data, 'er');
  //   }
  // };
  const getRoute = async (mode) => {
    try {
      // we are using parseFloat() because HERE API expects a float
      let from_lat = parseFloat(locations.pickup.latitude);
      let from_long = parseFloat(locations.pickup.longitude);
      let to_lat = parseFloat(locations.destination.latitude);
      let to_long = parseFloat(locations.destination.longitude);
      let m = mode;
      if (mode === 'bus') m = 'publicTransport';
      else if (mode === 'taxi') m = 'car';
      else if (mode === 'bike') m = 'bicycle';
      // we will save all Polyline coordinates in array
      let route_coordinates = [];
      const res = await axios.get(
        `https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=1KgX9HXsbICB9OiqnMPTq7GPw2HLFiMy_5TZNuZ0yo4&waypoint0=geo!${from_lat},${from_long}&waypoint1=geo!${to_lat},${to_long}&mode=fastest;${m};traffic:enabled&legAttributes=shape`
      );
      res.data.response.route[0].leg[0].shape.forEach((m) => {
        let latlong = m.split(',');
        let latitude = parseFloat(latlong[0]);
        let longitude = parseFloat(latlong[1]);
        route_coordinates.push({ latitude: latitude, longitude: longitude });
      });
      // console.log(route_coordinates);
      if (mode === 'taxi') setRouteCoordinationCar(route_coordinates);
      else if (mode === 'bus') setRouteCoordinationCarBus(route_coordinates);
      else if (mode === 'bike') setRouteCoordinationBike(route_coordinates);
    } catch (er) {
      // console.log(er.response.data);
    }
  };
  const [text, setText] = useState('');
  const x = [
    'Checking all possible routes...',
    'Finding Best Route for you...',
  ];
  useEffect(() => {
    // getTraffic();
    if (locations.destination) {
      modes.forEach((el) => {
        if (el !== 'Auto') {
          getRoute(el.toLowerCase());
        }
      });
    }
    // getRoute('car');
    // getRoute('bus');
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 6000);
    let i = 0;
    let j = 0;
    const interval = setInterval(() => {
      if (i > x[j].length - 1) {
        setText('');
        i = 0;
        j++;
      }

      if (j > x.length - 1) {
        clearInterval(interval);
        setText('Confirming your booking...');
      } else {
        setText((pre) => pre + x[j][i]);
        i++;
      }
    }, 80);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);
  if (!locations.destination) {
    return null;
  }
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: 20,
          }}
        >
          {text}
        </Text>
        <ActivityIndicator color="black" size="large" />
      </View>
    );
  }
  return (
    <ScrollView>
      <LinearGradient colors={['#FFE000', '#799F0C']} style={styles.container}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
            marginVertical: 20,
          }}
        >
          Fastest route with least crowd
        </Text>
        {modes.map((el) => {
          let routeMaps = [];
          let e = el.toLowerCase();
          // console.log(e, 'map');
          if (e === 'taxi') routeMaps = route_coordinates;
          else if (e === 'bus') routeMaps = route_coordinatesBus;
          else if (e === 'bike') routeMaps = route_coordinatesBike;
          else if (e === 'auto') routeMaps = route_coordinatesBus;
          return (
            <>
              <Text style={styles.sub} key={el}>
                Using only {el}
              </Text>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() =>
                  props.navigation.navigate('Route Details', {
                    routeMaps,
                  })
                }
              >
                <MapView
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  region={{
                    latitude: locations.destination.latitude,
                    longitude: locations.destination.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Polyline
                    coordinates={routeMaps}
                    strokeWidth={7}
                    strokeColor="red"
                    geodesic={true}
                  />
                  <Marker
                    coordinate={{
                      latitude: locations.pickup.latitude,
                      longitude: locations.pickup.longitude,
                    }}
                    title="Starting location"
                  />
                  <Marker
                    coordinate={{
                      latitude: locations.destination.latitude,
                      longitude: locations.destination.longitude,
                    }}
                    title="Finishlocation"
                  />
                </MapView>
              </TouchableOpacity>
              {/* <Button
                color="#007f5f"
                title="Continue"
                onPress={() => {
                  props.navigation.navigate('Payment Details');
                }}
              /> */}
            </>
          );
        })}
      </LinearGradient>
    </ScrollView>
  );
};

export default PossibleRoutes;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    minHeight: Dimensions.get('window').height,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#55a630',
  },
  sub: {
    fontWeight: '400',
    fontSize: 18,
    marginVertical: 5,
  },
});
