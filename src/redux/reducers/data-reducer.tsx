/* eslint-disable prettier/prettier */
const initialState = {
  data: {},
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      const newState = {
        ...state,
        data: { ...state.data, [action.payload.key]: action.payload.value },
      };
      return newState;
    case 'UPDATE_DATA':
      const updatedState = {
        ...state,
        data: { ...state.data, [action.payload.key]: action.payload.value },
      };
      return updatedState;
    default:
      return state;
  }
};

export default dataReducer;
