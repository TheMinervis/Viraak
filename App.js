import React, { useEffect } from 'react';
import { PermissionsAndroid, NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import AuthScreen from './screens/user/AuthScreen';
import StartupScreen from './screens/StartupScreen';
import CustomDrawer from './Components/customDrawer';
import UserScreen from './screens/user/userScreen';
import ProductDetailsScreen from './screens/delivery/productDetailsScreen';
import DeliveryHomeScreen from './screens/delivery/deliveryHomeScreen';
import MapDelivery from './screens/delivery/Location';
import SuccessDelivery from './screens/delivery/successDelivery';
import Scanner from './screens/QRcode/scanner';
import DonationScreen from './screens/donations/DonationScreen';
import DonatedItemDetailsScreen from './screens/donations/donatedItemDetails';
import SettingsScreen from './screens/SettingsPage';

import { useSelector, useDispatch } from 'react-redux';
import TrackDeliveries from './screens/delivery/trackDeliveries';
import { setInteractions } from './store/actions/interaction';
import HomeScreen from './screens/HomeScreen';

import HelpScreen from './screens/Help/HelpScreen';
import TravelScreen from './screens/Help/TravelScreen';
import ApplyScreen from './screens/Help/ApplyScreen';
import CheckScreen from './screens/Help/CheckScreen';
import VerifyScreen from './screens/Help/VerifyScreen';

const Toast = NativeModules.Toast;

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const StackUser = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#4e54c8' },
    }}
  >
    <Stack.Screen name="My Profile" component={UserScreen} />
  </Stack.Navigator>
);

const StackDelivery = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#5e548e' },
    }}
  >
    <Stack.Screen name="Delivery" component={DeliveryHomeScreen} />
    <Stack.Screen name="Maps" component={MapDelivery} />
    <Stack.Screen name="Details" component={ProductDetailsScreen} />
    <Stack.Screen name="Success" component={SuccessDelivery} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: 'red' },
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

const HelpStackNavigator = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="Help"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'green' },
      }}
    >
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Travel" component={TravelScreen} />
      <Stack.Screen name="Apply" component={ApplyScreen} />
      <Stack.Screen name="Check Status" component={CheckScreen} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => (
  <Tab.Navigator initialRouteName="Home" shifting={true}>
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: ({ color }) => {
          return <Ionicons name="ios-home" size={26} color={color} />;
        },
        tabBarColor: 'red',
      }}
    />
    <Tab.Screen
      name="Delivery"
      component={StackDelivery}
      options={{
        tabBarIcon: ({ color }) => {
          return <Ionicons name="ios-basket" size={26} color={color} />;
        },
        tabBarColor: '#9f86c0',
      }}
    />
    <Tab.Screen
      name="HelpStack"
      component={HelpStackNavigator}
      options={{
        title: 'Help',
        tabBarIcon: ({ color }) => {
          return <Ionicons name="ios-bus" size={26} color={color} />;
        },
        tabBarColor: 'green',
      }}
    />
    <Tab.Screen
      name="User"
      component={StackUser}
      options={{
        tabBarIcon: ({ color }) => {
          return <Ionicons name="ios-contact" size={26} color={color} />;
        },
        tabBarColor: '#8f94fb',
      }}
    />
  </Tab.Navigator>
);

const QRcodeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#7b5a44' },
      }}
    >
      <Stack.Screen name="Scan the code" component={Scanner} />
    </Stack.Navigator>
  );
};

const DonateStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#7b5a44' },
      }}
    >
      <Stack.Screen name="Donations" component={DonationScreen} />
      <Stack.Screen name="Details" component={DonatedItemDetailsScreen} />
    </Stack.Navigator>
  );
};

const TrackDelStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#424949' },
    }}
  >
    <Stack.Screen name="Track Deliveries" component={TrackDeliveries} />
    <Stack.Screen name="Scan Me" component={SuccessDelivery} />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#34a5d9' },
    }}
  >
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerStyle={{ backgroundColor: 'white' }}
    drawerContentOptions={{
      labelStyle: {
        color: 'black',
      },
      activeTintColor: 'orange',
    }}
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen name="Home" component={TabNavigator} />
    <Drawer.Screen name="Scan QRcode" component={QRcodeStack} />
    <Drawer.Screen name="Donate" component={DonateStack} />
    <Drawer.Screen name="Track Deliveries" component={TrackDelStack} />
    <Drawer.Screen name="Settings" component={SettingsStack} />
  </Drawer.Navigator>
);

export default function App() {
  const token = useSelector((state) => state.auth.token);
  const accessPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Location permission for bluetooth scanning',
          message: 'wahtever',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
    } catch (er) {
      console.log(er);
    }
  };
  const dispatch = useDispatch();
  const getBluetooth = async () => {
    try {
      const res = await Toast.bluetoothCheck();
      console.log(res, 'res');
      const resp = await Toast.discoverDevices();
      dispatch(setInteractions(resp));
      console.log(resp);
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    if (accessPermissions()) {
      getBluetooth();
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        name="main"
        initialRouteName={!token ? 'Logged out' : 'Logged In'}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Logging In"
          component={StartupScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#240b36',
            },
            headerTintColor: '#fff',
          }}
          name="Signin"
          component={AuthScreen}
        />

        <Stack.Screen
          name="Logged In"
          options={{ headerShown: false }}
          component={DrawerNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
