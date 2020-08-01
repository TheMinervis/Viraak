import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import HeaderButton from '../../Components/HeadButton';

const Scanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isFocused, setFocused] = useState(true);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButton
            name="ios-arrow-round-back"
            color="white"
            size={38}
            onPress={() => {
              navigation.goBack();
            }}
          />
        );
      },
    });
  });
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    const uns = navigation.addListener('focus', () => {
      setFocused(true);
    });
    navigation.addListener('blur', () => {
      setFocused(false);
    });
    return uns;
  }, [navigation]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (!isFocused) return null;
  return (
    <View
      style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}
    >
      <Camera
        style={{
          width: '100%',
          height: '80%',
          zIndex: 2,
          justifyContent: 'center',
        }}
        type={type}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={(res) => {
          Alert.alert('Scanned', res.data);
        }}
      >
        {/* <View
          style={{
            flex: 1,
            backgroundColor: 'black',
            opacity: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 100,
              height: 200,
              backgroundColor: 'red',
              zIndex: 4,
              position: 'absolute',
            }}
          ></View>
        </View> */}
      </Camera>
    </View>
  );
};

export default Scanner;
