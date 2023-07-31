/* eslint-disable prettier/prettier */
const initialState = {
  cpf: null,
};

const cpfReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CPF':
      return {
        ...state,
        cpf: action.payload,
      };
    default:
      return state;
  }
};

export default cpfReducer;
