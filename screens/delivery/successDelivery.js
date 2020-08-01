import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';

const SuccessDelivery = (props) => {
  return (
    <ScrollView>
      <LinearGradient colors={['#D3CCE3', '#E9E4F0']} style={styles.screen}>
        <Text style={styles.head}>
          Delivery of your item initiated successfully!!
        </Text>
        <Text style={styles.text}>
          Following QR code will be used for recieving purpose.
        </Text>
        <View style={styles.imageContainer}>
          <QRCode
            value={props.route.params.id}
            logo={require('../../assets/icon.png')}
            size={300}
            logoSize={50}
            backgroundColor="#9f86c0"
          />
        </View>
        <Text style={styles.head}>
          {props.route.params ? props.route.params.status : ''}
        </Text>
      </LinearGradient>
    </ScrollView>
  );
};

export default SuccessDelivery;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    minHeight: Dimensions.get('window').height,
  },
  imageContainer: {
    marginVertical: 30,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  head: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 12,
  },
});
