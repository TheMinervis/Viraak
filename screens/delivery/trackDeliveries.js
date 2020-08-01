import React, { useEffect, useLayoutEffect, useState } from 'react';

import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import HeaderButton from '../../Components/HeadButton';
import Axios from 'axios';
import { LINK } from '../../assets/config';
import { useSelector } from 'react-redux';

const Deliveries = (props) => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Scan Me', {
          status: `${props.status}!!`,
          id: props.id,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.head}>
            {props.productName}({props.status})
          </Text>
          <Text style={styles.sub}>On {props.createdAt}</Text>
          <Text style={styles.sub}>Paid : {props.price}</Text>
          <Text style={styles.sub}>Vehicle : {props.vehicle}</Text>
          <Text style={styles.sub}>Vehicle Num: {props.vehicleNum}</Text>
          <Text style={styles.sub}>Status : {props.status}</Text>
          <Text style={styles.sub}>Payment Method : {props.method}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            resizeMethod="resize"
            source={{ uri: props.url }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TrackDeliveries = ({ navigation }) => {
  const token = useSelector((state) => state.auth.token);
  const getData = async () => {
    try {
      setLoading(true);
      const res = await Axios.get(`${LINK}/delivery/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setDeliveries(res.data.deliveries.reverse());
    } catch (er) {
      Alert.alert('Error', er.response.data.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    const uns = navigation.addListener('focus', () => {
      getData();
    });
    console.log('pre book');
    // getData();
    return uns;
  }, [navigation]);

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
  const [loading, setLoading] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <Deliveries
        key={item._id}
        method={item.paymentMethod}
        price={200}
        url={`${LINK}/${item.prodImage}`}
        vehicle="Bus"
        status={item.confirmation}
        createdAt={item.createdAt.slice(0, 10)}
        productName={item.prodName}
        vehicleNum="OR-AH-2020"
        navigation={navigation}
        id={item._id}
      />
    );
  };
  return (
    <>
      <FlatList
        renderItem={renderItem}
        disableVirtualization={false}
        data={deliveries}
        keyExtractor={(item) => item._id}
        refreshing={loading}
        onRefresh={getData}
      />
    </>
  );
};

export default TrackDeliveries;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    width: '95%',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
  },
  imageContainer: {
    width: '45%',
    height: 190,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  textContainer: {
    paddingLeft: 20,
    flex: 1,
    justifyContent: 'center',
  },
  head: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  sub: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
