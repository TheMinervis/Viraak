import React, { useState, useLayoutEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import HeaderButton from '../Components/HeadButton';
import Filter from '../Components/UI/Filter';
import { useSelector } from 'react-redux';

const DeviceComp = (props) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('white')}
    >
      <View
        style={{
          width: '80%',
          backgroundColor: 'black',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          {props.name}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const SettingsPage = ({ navigation }) => {
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
  const [notify, setNotify] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const interaction = useSelector((state) => state.interaction.devices);
  console.log(interaction, 'interaction');
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ width: '100%', height: 290 }}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{
            uri:
              'https://cdn.shopify.com/s/files/1/2382/6729/products/SP125306.jpg?v=1585341802',
          }}
        />
      </View>
      <TextInput
        style={{
          width: '80%',
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
          padding: 5,
          marginVertical: 12,
          //   alignSelf: 'flex-start',
        }}
        placeholder="Set limit"
      />
      <Button title="Set Limit" />
      <Filter
        name="Notify when limit exceeds"
        toggleSwitch={() => setNotify((pre) => !pre)}
        state={notify}
      />
      <Filter
        name="Vibrate when people are close"
        toggleSwitch={() => setVibrate((pre) => !pre)}
        state={vibrate}
      />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 18,
          color: 'black',
          borderWidth: 1,
          borderColor: 'grey',
          paddingHorizontal: 12,
          paddingVertical: 5,
          marginVertical: 12,
        }}
      >
        You interacted with {interaction.length} people, today
      </Text>
      {interaction.map((el) => (
        <DeviceComp key={el.address} name={el.name} />
      ))}
    </View>
  );
};

export default SettingsPage;
