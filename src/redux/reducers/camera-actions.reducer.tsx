/* eslint-disable prettier/prettier */
const initialState = {
  data: {},
};

const dataCameraReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DATA_CAMERA':
      const newState = {
        ...state,
        dataCamera: { ...state.data, [action.payload.key]: action.payload.value },
      };
      return newState;
    case 'UPDATE_DATA_CAMERA':
      const updatedState = {
        ...state,
        dataCamera: { ...state.data, [action.payload.key]: action.payload.value },
      };
      return updatedState;
    default:
      return state;
  }
};

export default dataCameraReducer;
