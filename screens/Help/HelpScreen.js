import React, { useLayoutEffect } from 'react';
import { FlatList } from 'react-native';
import HeaderButton from '../../Components/HeadButton';
import CardComponent from '../../Components/CardComponent';

const data = [
  {
    id: '1',
    title: 'Travel',
    desc:
      'Submit for any urgent travel request and wait for Government approval',
    imageUrl:
      'https://breathedreamgo.com/wp-content/uploads/2018/11/SS-India-train.jpg',
    buttonDesc: 'get help',
  },
];

const renderItem = (navigation, itemData) => {
  return (
    <CardComponent
      title={itemData.item.title}
      buttonDesc={itemData.item.buttonDesc}
      desc={itemData.item.desc}
      imageUrl={itemData.item.imageUrl}
      navigation={navigation}
    />
  );
};

const HelpScreen = (props) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButton
            name="ios-search"
            color="white"
            size={25}
            onPress={() => {}}
          />
        );
      },
      headerLeft: () => {
        return (
          <HeaderButton
            name="ios-menu"
            color="white"
            size={25}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        );
      },
    });
  });

  return (
    <FlatList
      style={{ backgroundColor: 'black', width: '100%' }}
      contentContainerStyle={{ alignItems: 'center' }}
      data={data}
      renderItem={renderItem.bind(this, props.navigation)}
    />
  );
};

export default HelpScreen;
