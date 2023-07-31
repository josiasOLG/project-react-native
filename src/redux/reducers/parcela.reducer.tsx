/* eslint-disable prettier/prettier */
const initialState = {
  valor: null,
};

const tipoParcela = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PARCELA':
      return {
        ...state,
        valor: action.payload,
      };
    default:
      return state;
  }
};

export default tipoParcela;
