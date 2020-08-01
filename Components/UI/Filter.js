import React from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';

const Filter = (props) => {
  const styles = StyleSheet.create({
    filter: {
      flexDirection: 'row',
      width: '80%',
      justifyContent: 'space-between',
      marginVertical: 15,
    },
    text: {
      fontSize: props.size ? props.size : 20,
      color: 'black',
      fontWeight: props.none ? 'normal' : 'bold',
    },
  });
  return (
    <View style={styles.filter}>
      <Text style={styles.text}>{props.name}</Text>
      <Switch
        value={props.state}
        onValueChange={props.toggleSwitch}
        trackColor={{ true: '#007f5f' }}
        thumbColor={props.state ? '#007f5f' : ''}
      />
    </View>
  );
};

export default Filter;
