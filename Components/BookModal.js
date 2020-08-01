import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { useDispatch } from 'react-redux';
import CustomButton from './UI/CustomButton';
import { setTransportationMode } from '../store/actions/location';
import Filter from '../Components/UI/Filter';

const BookModal = (props) => {
  const height = Dimensions.get('window').height;
  // const height = 0;
  const styles = StyleSheet.create({
    container: {
      width: '98%',
      bottom: props.show ? 0 : -height,
      borderWidth: 1,
      borderColor: 'grey',
      zIndex: 50,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
    },
    transport: {
      width: '100%',
      borderColor: 'grey',
      borderWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 10,
    },
    button: {
      width: '80%',
      backgroundColor: '#007f5f',
      borderRadius: 20,
      marginVertical: 10,
    },
  });

  const dispatch = useDispatch();
  const [isTaxi, setIsTaxi] = useState(false);
  const [isBus, setBus] = useState(false);
  const [isAuto, setAuto] = useState(false);
  const [isBike, setBike] = useState(false);

  const yTranslate = useRef(new Animated.Value(0)).current;
  let negativeHeight = -height + height / 2 + 60;
  let modalMoveY = yTranslate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, negativeHeight],
  });
  let translateStyle = { transform: [{ translateY: modalMoveY }] };

  useEffect(() => {
    if (props.show) {
      yTranslate.setValue(0);
      Animated.spring(yTranslate, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(yTranslate, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [props.show]);

  return (
    <Animated.View style={[styles.container, translateStyle]}>
      <View
        style={{
          width: Dimensions.get('window').width,
          // height: Dimensions.get('window').height / 2,
          minHeight: props.show ? Dimensions.get('window').height / 2 : 0,
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          Select Your perferred vehicles..
        </Text>
        <Filter
          toggleSwitch={() => {
            setIsTaxi((prevState) => !prevState);
          }}
          name="Taxi"
          state={isTaxi}
        />
        <Filter
          toggleSwitch={() => {
            setBike((prevState) => !prevState);
          }}
          name="Bike"
          state={isBike}
        />
        <Filter
          toggleSwitch={() => {
            setBus((prevState) => !prevState);
          }}
          name="Bus"
          state={isBus}
        />
        <Filter
          toggleSwitch={() => {
            setAuto((prevState) => !prevState);
          }}
          name="Auto"
          state={isAuto}
        />
        <CustomButton
          style={styles.button}
          onPress={() => {
            let mode = [];
            if (isAuto) {
              mode.push('Auto');
            }
            if (isBike) {
              mode.push('Bike');
            }
            if (isBus) {
              mode.push('Bus');
            }
            if (isTaxi) {
              mode.push('Taxi');
            }
            // console.log('hello');
            dispatch(setTransportationMode(mode));
            props.navigation.navigate('Possible Routes', { mode: mode });
          }}
        >
          Continue
        </CustomButton>
        {/* <TouchableNativeFeedback
          onPress={() => {
            dispatch(setTransportationMode("Bus"));
            props.navigation.navigate("Possible Routes");
          }}
        >
          <View style={styles.transport}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
              Bus
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            dispatch(setTransportationMode("Auto"));
            props.navigation.navigate("Possible Routes");
          }}
        >
          <View style={styles.transport}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
              Auto
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            dispatch(setTransportationMode("Taxi"));
            props.navigation.navigate("Possible Routes");
          }}
        >
          <View style={styles.transport}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
              Taxi
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            dispatch(setTransportationMode("Bike"));
            props.navigation.navigate("Book Here", {
              screen: "Possible Routes",
              inital: false,
            });
          }}
        >
          <View style={styles.transport}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
              Bike
            </Text>
          </View>
        </TouchableNativeFeedback> */}
      </View>
    </Animated.View>
  );
};

export default BookModal;
