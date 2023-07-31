/* eslint-disable prettier/prettier */
const initialState = {
  valor: null,
};

const tipoDocumentoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TIPO_DOCUMENTO':
      return {
        ...state,
        valor: action.payload,
      };
    default:
      return state;
  }
};

export default tipoDocumentoReducer;
