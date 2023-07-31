/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Formik, Field } from 'formik';

import { styles } from './DadosBancarios.style';
import { DadosBancariosValidation } from '../../reusable/Formik/validation/DadosBancarios/DadosBancarios.validation';
import FormikSelect from '../../reusable/Formik/FormikSelect/FormikSelect';
import FormikField from '../../reusable/Formik/FormikField/FormikField';
import { ScrollView } from 'react-native-gesture-handler';
import { ImageBackground } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/actions/loading.actions';
import {
  LoginDados,
  RootState,
} from '../../../services/interfaces/user-agreements.interface';
import { getItem } from '../../../services/storage/SecureStorage.service';
import dadosBancariosService from '../../../services/dados-bancarios.service';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

interface ResponseData {
  account: string;
  active: boolean;
  agency: string;
  bank: string;
  createdAt: string;
  id: number;
  pix: string;
  pixKey: string;
  updatedAt: string;
  userId: string;
}

interface Response {
  data: ResponseData;
  message: string;
}

const DadosBancariosView: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true); // Inicialmente definido como true
  const [dados, setDados] = useState<ResponseData>({});
  const [dadosUser, setDadosuser] = useState<any>();
  const [initialValues, setInitialValues] = useState({
    bank: '',
    pix: '',
    agency: '',
    account: '',
    chavePix: '',
  });
  const dispatch = useDispatch();

  const showToast = (type, titulo, mensagem) => {
    Toast.show({
      type: type,
      text1: titulo,
      text2: mensagem,
      visibilityTime: 6000,
      autoHide: true,
      topOffset: 30,
    });
  };

  const handleBackPress = () => {
    navigation.navigate('HomeView');
  };


  const handleFormSubmit = (values) => {
    // dispatch(setLoading(true));


    const payload = {
      userId: dadosUser?.id,
      bank: values?.bank,
      agency: values?.agency,
      account: values?.account,
      pix: Number(values?.pix),
      pixKey: values?.chavePix
    }
    console.log(payload);
    dadosBancariosService
      .post(
        `/users-bank-account`,
        payload
      )
      .then(async () => {
        dispatch(setLoading(false));
        navigation.navigate('HomeView');
        showToast('success', 'Sucesso!', 'Dados cadastrados com sucesso!');
      })
      .catch((error) => {
        dispatch(setLoading(false));
        // console.log(error.response);
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          showToast('error', 'Ocorreu um erro!', errorMessage);
        }
      });
  };

  const bankOptions = [
    { label: 'Banco do Brasil', value: '001' },
    { label: 'Banco da Amazônia', value: '003' },
    { label: 'Banco do Nordeste', value: '004' },
    { label: 'Banestes', value: '021' },
    { label: 'Banco Alfa', value: '025' },
    { label: 'Besc', value: '027' },
    { label: 'Banerj', value: '029' },
    { label: 'Banco Beg', value: '031' },
    { label: 'Banco Santander Banespa', value: '033' },
    { label: 'Banco Bem', value: '036' },
    { label: 'Banpará', value: '037' },
    { label: 'Banestado', value: '038' },
    { label: 'BEP', value: '039' },
    { label: 'Banco Cargill', value: '040' },
    { label: 'Banrisul', value: '041' },
    { label: 'BVA', value: '044' },
    { label: 'Banco Opportunity', value: '045' },
    { label: 'Banese', value: '047' },
    { label: 'Hipercard', value: '062' },
    { label: 'Ibibank', value: '063' },
    { label: 'Lemon Bank', value: '065' },
    { label: 'Banco Morgan Stanley Dean Witter', value: '066' },
    { label: 'BPN Brasil', value: '069' },
    { label: 'Banco de Brasília – BRB', value: '070' },
    { label: 'Banco Rural', value: '072' },
    { label: 'Banco Popular', value: '073' },
    { label: 'Banco J. Safra', value: '074' },
    { label: 'Banco CR2', value: '075' },
    { label: 'Banco KDB', value: '076' },
    { label: 'Banco BMF', value: '096' },
    { label: 'Caixa Econômica Federal', value: '104' },
    { label: 'Banco BBM', value: '107' },
    { label: 'Banco Único', value: '116' },
    { label: 'Nossa Caixa', value: '151' },
    { label: 'Banco Finasa', value: '175' },
    { label: 'Banco Itaú BBA', value: '184' },
    { label: 'American Express Bank', value: '204' },
    { label: 'Banco Pactual', value: '208' },
    { label: 'Banco Matone', value: '212' },
    { label: 'Banco Arbi', value: '213' },
    { label: 'Banco Dibens', value: '214' },
    { label: 'Banco Joh Deere', value: '217' },
    { label: 'Banco Bonsucesso', value: '218' },
    { label: 'Banco Calyon Brasil', value: '222' },
    { label: 'Banco Fibra', value: '224' },
    { label: 'Banco Brascan', value: '225' },
    { label: 'Banco Cruzeiro', value: '229' },
    { label: 'Unicard', value: '230' },
    { label: 'Banco GE Capital', value: '233' },
    { label: 'Bradesco', value: '237' },
    { label: 'Banco Clássico', value: '241' },
    { label: 'Banco Stock Máxima', value: '243' },
    { label: 'Banco ABC Brasil', value: '246' },
    { label: 'Banco Boavista Interatlântico', value: '248' },
    { label: 'Investcred Unibanco', value: '249' },
    { label: 'Banco Schahin', value: '250' },
    { label: 'Banco Brascan', value: '251' },
    { label: 'Fininvest', value: '252' },
    { label: 'Paraná Banco', value: '254' },
    { label: 'Banco Cacique', value: '263' },
    { label: 'Banco Fator', value: '265' },
    { label: 'Banco Cédula', value: '266' },
    { label: 'Banco de la Nación Argentina', value: '300' },
    { label: 'Banco BMG', value: '318' },
    { label: 'Banco Industrial e Comercial', value: '320' },
    { label: 'ABN Amro Real', value: '356' },
    { label: 'Itau', value: '341' },
    { label: 'Sudameris', value: '347' },
    { label: 'Banco Santander', value: '351' },
    { label: 'Banco Santander Brasil', value: '353' },
    { label: 'Banco Societe Generale Brasil', value: '366' },
    { label: 'Banco WestLB', value: '370' },
    { label: 'JP Morgan', value: '376' },
    { label: 'Banco Mercantil do Brasil', value: '389' },
    { label: 'Banco Mercantil de Crédito', value: '394' },
    { label: 'HSBC', value: '399' },
    { label: 'Unibanco', value: '409' },
    { label: 'Banco Capital', value: '412' },
    { label: 'Banco Safra', value: '422' },
    { label: 'Banco Rural', value: '453' },
    { label: 'Banco Tokyo Mitsubishi UFJ', value: '456' },
    { label: 'Banco Sumitomo Mitsui Brasileiro', value: '464' },
    { label: 'Citibank', value: '477' },
    { label: 'Itaubank (antigo Bank Boston)', value: '479' },
    { label: 'Deutsche Bank', value: '487' },
    { label: 'Banco Morgan Guaranty', value: '488' },
    { label: 'Banco NMB Postbank', value: '492' },
    { label: 'Banco la República Oriental del Uruguay', value: '494' },
    { label: 'Banco La Provincia de Buenos Aires', value: '495' },
    { label: 'Banco Credit Suisse', value: '505' },
    { label: 'Banco Luso Brasileiro', value: '600' },
    { label: 'Banco Industrial', value: '604' },
    { label: 'Banco VR', value: '610' },
    { label: 'Banco Paulista', value: '611' },
    { label: 'Banco Guanabara', value: '612' },
    { label: 'Banco Pecunia', value: '613' },
    { label: 'Banco Panamericano', value: '623' },
    { label: 'Banco Ficsa', value: '626' },
    { label: 'Banco Intercap', value: '630' },
    { label: 'Banco Rendimento', value: '633' },
    { label: 'Banco Triângulo', value: '634' },
    { label: 'Banco Sofisa', value: '637' },
    { label: 'Banco Prosper', value: '638' },
    { label: 'Banco Pine', value: '643' },
    { label: 'Itaú Holding Financeira', value: '652' },
    { label: 'Banco Indusval', value: '653' },
    { label: 'Banco A.J. Renner', value: '654' },
    { label: 'Banco Votorantim', value: '655' },
    { label: 'Banco Daycoval', value: '707' },
    { label: 'Banif', value: '719' },
    { label: 'Banco Credibel', value: '721' },
    { label: 'Banco Gerdau', value: '734' },
    { label: 'Banco Pottencial', value: '735' },
    { label: 'Banco Morada', value: '738' },
    { label: 'Banco Galvão de Negócios', value: '739' },
    { label: 'Banco Barclays', value: '740' },
    { label: 'BRP', value: '741' },
    { label: 'Banco Semear', value: '743' },
    { label: 'Banco Citibank', value: '745' },
    { label: 'Banco Modal', value: '746' },
    { label: 'Banco Rabobank International', value: '747' },
    { label: 'Banco Cooperativo Sicredi', value: '748' },
    { label: 'Banco Simples', value: '749' },
    { label: 'Dresdner Bank', value: '751' },
    { label: 'BNP Paribas', value: '752' },
    { label: 'Banco Comercial Uruguai', value: '753' },
    { label: 'Banco Merrill Lynch', value: '755' },
    { label: 'Banco Cooperativo do Brasil', value: '756' },
    { label: 'KEB', value: '757' },
  ];

  const pixOptions = [
    { label: 'CpfCnpj', value: '0' },
    { label: 'Celular', value: '1' },
    { label: 'Email', value: '2' },
    { label: 'AgenciaConta', value: '3' },
  ];


  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          dispatch(setLoading(true));
          const dadosUser: any = await dadosBancariosService.get(`users/user`);
          const response: Response = await dadosBancariosService.get(
            `users-bank-account/${dadosUser?.data?.id}`
          );
          setDadosuser(dadosUser?.data);
          setDados(response?.data);
          const { data } = response;
          console.log(data?.pix);
          setInitialValues({
            bank: data?.bank?.toString() || '',
            pix: data?.pix?.toString() || '',
            agency: data?.agency?.toString().replace(/\W/g, ''),
            account: data?.account?.toString().replace(/\W/g, ''),
            chavePix: data?.pixKey?.toString(),
          });
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingData(false);
          dispatch(setLoading(false)); // Desativar o estado de carregamento após as conclusões das requisições ou quando ocorrer um erro
        }
      };
      fetchData();
    }, [])
  );

  const sortedBankOptions = [...bankOptions].sort((a, b) => a.label.localeCompare(b.label));



  return (
    <Fragment>
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />
      <ImageBackground
        source={require('../../../assets/images/back-nome.png')}
        style={styles.bottomSection}
        resizeMode="cover"
      >
        <View style={styles.topo}>
          <View style={styles.col1}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image
                source={require('../../../assets/images/seta-direita-preta.png')}
                resizeMode="contain"
                style={styles.topo.image}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.col10, styles.topo.centerContent]}>
            <Text style={styles.titulo}>Dados Bancários</Text>
          </View>
          <View style={styles.col1} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            {!loadingData && (
              <Formik
                initialValues={initialValues}
                validationSchema={DadosBancariosValidation}
                onSubmit={handleFormSubmit}
              >
                {({ handleSubmit, values }) => (
                  <View style={styles.form}>
                    <Text style={styles.form.texto}>
                      Digite os dados bancarios de onde o senhor(a) deseja
                      receber seu dinheiro.
                    </Text>
                    <Field
                      component={FormikSelect}
                      name="bank"
                      placeholder="Banco"
                      options={sortedBankOptions}
                    />

                    <Field
                      component={FormikField}
                      name="agency"
                      placeholder="Agência"
                      keyboardType="numeric"
                    />
                    <Field
                      component={FormikField}
                      name="account"
                      placeholder="Conta"
                      keyboardType="numeric"
                    />
                    <Field
                      component={FormikSelect}
                      name="pix"
                      placeholder="Pix"
                      options={pixOptions}
                    />
                    <Field
                      component={FormikField}
                      name="chavePix"
                      placeholder="Chave Pix"
                      disabled={values.pix === 3 ? true : false}
                    />
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={styles.form.button}
                      disabled={isLoading}
                    >
                      <Text style={styles.form.buttonText}>
                        {!isLoading ? 'Enviar dados' : '...'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </Fragment>
  );
};

export default DadosBancariosView;
