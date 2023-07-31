/* eslint-disable prettier/prettier */
const initialState = {
  data: {},
};

const dataLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DATA_LOGIN':
      const newState = {
        ...state,
        dataLogin: { ...state.data, [action.payload.key]: action.payload.value },
      };
      return newState;
    case 'ADD_DATA_LOGADO':
      const newStateLogado = {
        ...state,
        dataLogado: { ...state.data, [action.payload.key]: action.payload.value },
      };
      return newStateLogado;
    case 'UPDATE_DATA_LOGIN':
      const updatedState = {
        ...state,
        dataLogin: { ...state.data, [action.payload.key]: action.payload.value },
      };
      return updatedState;
    default:
      return state;
  }
};

export default dataLoginReducer;
