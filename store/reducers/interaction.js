import { SET_INTERACTIONS } from '../actions/interaction';

const initialState = {
  devices: [],
};

export const ineractionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INTERACTIONS:
      console.log('i am here');
      return { devices: action.devices };
    default:
      return state;
  }
};
