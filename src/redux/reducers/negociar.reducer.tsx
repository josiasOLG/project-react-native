/* eslint-disable prettier/prettier */
const initialState = {
  valor: null,
};

const NegociarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NEGOCIAR':
      return {
        ...state,
        valor: action.payload,
      };
    default:
      return state;
  }
};

export default NegociarReducer;
