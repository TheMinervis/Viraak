import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const ShopCard = (props) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShH3CHHpR2Zlz2SLVGPnKG-BwuoR3QFnGZnA&usqp=CAU',
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.head}>Hotel sirose</Text>
          <Text style={styles.sub}>
            North Indian|South Indian|Chinese,Biryani
          </Text>
          <Text style={styles.sub}>₹300 per person</Text>
          <Text style={styles.sub}>Rating : 4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShopCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '95%',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
  },
  imageContainer: {
    width: '40%',
    height: 150,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: 'hidden',
  },
  textContainer: {
    paddingLeft: 20,
    flex: 1,
    justifyContent: 'center',
  },
  head: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  sub: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
