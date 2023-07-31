/* eslint-disable prettier/prettier */
import {createStore, combineReducers} from 'redux';
import cpfReducer from '../reducers/cpf.reducer';
import authReducer from '../reducers/auth.reducer';
import dataReducer from '../reducers/data-reducer';
import dataLoginReducer from '../reducers/login-data.reducer';
import dataCameraReducer from '../reducers/camera-actions.reducer';
import tipoDocumentoReducer from '../reducers/tipo-documento.reducer';
import tipoParcela from '../reducers/parcela.reducer';
import ConvenioTtemsReducer from '../reducers/convenio-itens.reducer';
import NegociarReducer from '../reducers/negociar.reducer';
import TokenDeviceReducer from '../reducers/token-device.reducer';
import LoadingReducer from '../reducers/loading.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cpf: cpfReducer,
  data: dataReducer,
  dataLogin: dataLoginReducer,
  dataCamera: dataCameraReducer,
  tipoDocumento: tipoDocumentoReducer,
  tipoParcela: tipoParcela,
  convenioItems: ConvenioTtemsReducer,
  negociarItems: NegociarReducer,
  tokenDevice: TokenDeviceReducer,
  loading: LoadingReducer,
});

const store = createStore(rootReducer);

export default store;
