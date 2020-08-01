import React from 'react';
import { registerRootComponent } from 'expo';
import authReducer from './store/reducers/auth';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { locationReducer } from './store/reducers/location';
import { deliveryLocationReducers } from './store/reducers/deliveryLocation';
import { ineractionReducer } from './store/reducers/interaction';
import ReduxThunk from 'redux-thunk';
import App from './App';
import { travelReducer } from './store/reducers/travel';
import { locationsReducer } from './store/reducers/locations';

const rootReducer = combineReducers({
  location: locationReducer,
  auth: authReducer,
  deliveryLocation: deliveryLocationReducers,
  interaction: ineractionReducer,
  locations: locationsReducer,
  travel: travelReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const Comp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(Comp);
