/* eslint-disable prettier/prettier */
const initialState = {
  token: '',
};

const TokenDeviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN_DEVICE':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default TokenDeviceReducer;
