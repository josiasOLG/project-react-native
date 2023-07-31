/* eslint-disable prettier/prettier */
import * as yup from 'yup';

export const DadosBancariosValidation = yup.object().shape({
  bank: yup.string().required('O campo banco é obrigatório'),
  pix: yup.string().required('O campo pix é obrigatório'),
  agency: yup.string().required('O campo agência é obrigatório'),
  account: yup.string().required('O campo conta é obrigatório'),
  chavePix: yup.string().required('O campo chave pix é obrigatório'),
});
