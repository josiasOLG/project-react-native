/* eslint-disable prettier/prettier */
const initialState = {
  items: [],
};

const ConvenioTtemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item !== action.payload),
      };
    default:
      return state;
  }
};

export default ConvenioTtemsReducer;