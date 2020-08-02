import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { View, Dimensions } from 'react-native';

const TrafficMap = (props) => {
  const locations = useSelector((state) => state.location);
  const route_coordinates = props.route.params.routeMaps;
  return (
    <MapView
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}
      region={{
        latitude: locations.pickup.latitude,
        longitude: locations.pickup.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Polyline
        coordinates={route_coordinates}
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
  );
};

export default TrafficMap;
