import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Input from '../../Components/input';
import Button from '../../Components/CustomButton';
import VolunteerCard from '../../Components/VolunteerCard';

const FindVolunteers = (props) => {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState('street address');
  const [pin, setPin] = useState('751016');
  const [stores, setStores] = useState(null);
  // const []

  const fetchApi = async () => {
    try {
      let data = await fetch(
        `https://obscure-tundra-86090.herokuapp.com/api/v1/volunteers/${pin}`
      );
      data = await data.json();
      console.log(data.data);
      setStores(data.data.data);
    } catch (er) {
      console.log(er);
      setShow(false);
      setStores(null);
      Alert.alert('error', 'check connection');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView contentContainerStyle={styles.screen}>
        <Input value={address} onChangeText={setAddress}>
          address
        </Input>
        <Input value={pin} onChangeText={setPin}>
          pin
        </Input>
        <Button
          onPress={() => {
            setShow(true);
            fetchApi();
            setStores(null);
          }}
        >
          search
        </Button>
        {show ? (
          <View style={styles.searchContainer}>
            <Text style={{ fontSize: 20, color: 'white', marginVertical: 10 }}>
              Available Nearby Volunteers
            </Text>
            {stores ? (
              stores.map((el) => {
                return (
                  <VolunteerCard
                    name={el.name}
                    prof={el.proffession}
                    time={el.arrivesAt}
                    price={el.price}
                    key={el._id}
                  />
                );
              })
            ) : (
              <ActivityIndicator color="white" size={30} />
            )}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default FindVolunteers;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: 'black',
  },
  searchContainer: {
    alignItems: 'center',
  },
});
