/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import { styles } from './SalvarConvenio.style';
import { TextInput, Button, Card, Title, Text } from 'react-native-paper';
import { Formik, Field, FieldProps, useFormik } from 'formik';
import * as yup from 'yup';
import { setLocale } from 'yup';
import { ptForm } from 'yup-locale-pt';

import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { Switch } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../services/interfaces/user-agreements.interface';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonFooterKeyboard from '../../../reusable/button-footer-keyboard/buttonFooterKeyboard.reusable';
import useKeyboardVisibility from '../../../../services/keyboardVisibilityService';
import { TextInputMask } from 'react-native-masked-text';
import conveniosService from '../../../../services/convenios.service';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

setLocale(ptForm);

interface RouteParams {
  titulo: string;
  url: string;
  tela: string;
  data: string; // ajuste o tipo de data se necessário, ex: Date
}
interface FormField {
  id: string;
  type: string;
  label: string;
  validation: {
    type: string;
    required?: boolean;
    email?: boolean;
    min?: number;
    max?: number;
  };
}

const generateValidationSchema = (fields: FormField[]) => {
  let validations: { [key: string]: any } = {};

  fields.forEach((field) => {
    const { id, validation } = field;

    let validator: yup.Schema<any>;

    if (validation.type === 'string') {
      validator = yup.string();
      // if (validation.required) validator = validator.required();
      if (validation.email) validator = validator.email();
      if (validation.min) validator = validator.min(validation.min);
      if (validation.max) validator = validator.max(validation.max);
    } else if (validation.type === 'number') {
      validator = yup.number();
      // if (validation.required) validator = validator.required();
      if (validation.min) validator = validator.min(validation.min);
      if (validation.max) validator = validator.max(validation.max);
    } else {
      validator = yup.mixed();
      if (validation.required) validator = validator.required();
    }

    validations[id] = validator;
  });

  return yup.object().shape(validations);
};

interface MyInputProps extends FieldProps {
  label: string;
  keyboardType: 'email-address' | 'default';
  type?: string;
}

const MyInput: React.FC<MyInputProps> = ({
  field,
  form,
  label,
  type,
  value,
  ...props
}) => {
  const { name } = field;
  const { errors, touched } = form;
  const isPasswordField = name === 'password';
  let MaskedComponent: React.ComponentType<any> = TextInput;
  let maskType: string | undefined;
  // console.log(value);
  switch (label) {
    case 'cpf':
      maskType = 'cpf';
      MaskedComponent = TextInputMask;
      break;
    case 'email':
      maskType = undefined;
      MaskedComponent = TextInput; // supondo que não vamos aplicar máscaras para emails
      break;
    default:
      maskType = undefined;
      MaskedComponent = TextInput; // para os campos que não precisam de máscaras
  }
  if (MaskedComponent === TextInputMask) {
    return (
      <View style={styles.card}>
        <Text style={[styles.form.label]}>{label}</Text>
        <MaskedComponent
          {...props}
          type={maskType} // aqui
          value={field.value ? field.value : value}
          onChangeText={form.handleChange(name)}
          error={touched[name] && Boolean(errors[name])}
          style={[styles.form.input, styles.form.InputMask]}
          placeholder={label}
          secureTextEntry={isPasswordField}
        />
        {touched[name] && errors[name] ? (
          <Text style={styles.form.error}>{errors[name] as string}</Text>
        ) : null}
      </View>
    );
  } else {
    return (
      <View style={styles.card}>
        <Text style={[styles.form.label]}>{label}</Text>
        <MaskedComponent
          {...props}
          value={field.value ? field.value : value}
          onChangeText={form.handleChange(name)}
          error={touched[name] && Boolean(errors[name])}
          style={[styles.form.input]}
          placeholder={label}
          secureTextEntry={isPasswordField}
        />
        {touched[name] && errors[name] ? (
          <Text style={styles.form.error}>{errors[name] as string}</Text>
        ) : null}
      </View>
    );
  }
};
const SalvarConvenioView: React.FC = () => {
  const dadosItems = useSelector((state: any) => state.convenioItems);
  const navigation = useNavigation();
  const [items, setItems] = useState<any>([]);
  const [dados, setDados] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);
  const { keyboardVisible, screenWidth } = useKeyboardVisibility();
  const [currentPassword, setCurrentPassword] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [numeroBeneficio, setNumeroBeneficio] = useState('');
  const [error, setError] = useState({ current: '', new: '', confirm: '' });

  const transformData = (data) => {
    return data.map((item) => ({
      id: item?.agreementParameters?.identifier,
      type: item?.agreementParameters?.type,
      label: item?.agreementParameters?.label,
      validation: {
        type: item?.agreementParameters?.validationType,
        required: item?.agreementParameters?.validationRequired, // obtendo required a partir do dado original
        min: item?.agreementParameters?.validationMin,
        max: item?.agreementParameters?.validationMax,
      },
      value: item?.value, // se você quiser manter o valor original também
    }));
  };

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

  const initialValues = items.reduce(
    (values, field) => ({
      ...values,
      [field.id]: '',
    }),
    {}
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response: any = await conveniosService.get(
            `user-agreement-parameters-values/${dadosItems?.items?.id}`
          );
          const transformedData = transformData(response.data);
          setItems(transformedData);
          setDados(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [])
  );

  const validationSchema = generateValidationSchema(items);

  const handleBackPress = () => {
    navigation.navigate('MeusConvenioView');
  };

  const handleSubmit = (values: any) => {
    setLoading(true);
    const arrayResult = compareAndCreateArray(dados, values);
    conveniosService
      .put(
        `/user-agreement-parameters-values/${dadosItems.items.id}`,
        arrayResult
      )
      .then(async () => {
        setLoading(false);
        navigation.navigate('HomeView');
        showToast('success', 'Sucesso!', 'Dados cadastrados com sucesso!');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          showToast('error', 'Ocorreu um erro!', errorMessage);
        }
      });
  };

  const compareAndCreateArray = (
    data: { id: number; agreementParameters: { identifier: string } }[],
    values: { [key: string]: any }
): { userAgreementParametersValueId: number; value: any }[] => {
    const result: { userAgreementParametersValueId: number; value: any }[] = [];
    // console.log(values);
    data.forEach((item) => {
      const id = item.id;
      const value = values[item.agreementParameters.identifier];
      result.push({ userAgreementParametersValueId: id, value });
    });
    return result;
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />
      <ImageBackground
        source={require('../../../../assets/images/back-nome.png')}
        style={styles.bottomSection}
        resizeMode="cover"
      >
        <View style={styles.topo}>
          <View style={styles.col1}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image
                source={require('../../../../assets/images/seta-direita-preta.png')}
                resizeMode="contain"
                style={styles.topo.image}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.col11, styles.topo.centerContent]}>
            <Text style={styles.titulo}>Convênios</Text>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formikProps) => {
                const handleSubmitPress = () => {
                  formikProps.handleSubmit();
                };

                return (
                  <View style={styles.form}>
                    <Title style={styles.form.texto}>Digite os campos</Title>
                    <Title style={styles.form.texto2}>
                      Digite corretamente!
                    </Title>
                    {items.map((field) => (
                      <View key={field.id}>
                        <Field
                          component={MyInput}
                          name={field.id}
                          label={field.label}
                          type={field.type}
                          value={field.value}
                          keyboardType={
                            field.type === 'email' ? 'email-address' : 'default'
                          }
                        />
                      </View>
                    ))}
                    <Button
                      mode="contained"
                      onPress={handleSubmitPress}
                      style={styles.form.button}
                      disabled={isLoading}
                    >
                      <Text style={styles.form.buttonText}>{!isLoading ? 'Enviar dados' : '...'}</Text>
                    </Button>
                  </View>
                );
              }}
            </Formik>

            {/* <View style={styles.form}>
              <View style={styles.form.containerTexto}>
                <Text style={styles.form.texto}>Digite os campos</Text>
                <Text style={styles.form.texto2}>Digite corretamente!</Text>
              </View>
              <View style={styles.form.inputContainer}>
                <Text style={styles.form.label}>Senha averbação</Text>
                <TextInput
                  style={styles.form.input}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Senha averbação"
                  secureTextEntry
                />
                {error.current !== '' && (
                  <Text style={styles.form.error}>{error.current}</Text>
                )}
              </View>
              <View style={styles.form.inputContainer}>
                <Text style={styles.form.label}>Data nascimento</Text>
                <TextInputMask
                  type={'datetime'}
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  style={styles.form.input}
                  keyboardType="numeric"
                  placeholder="DD/MM/YYYY"
                  maxLength={11}
                  value={dataNascimento}
                  onChangeText={(text) => setDataNascimento(text)}
                />
                {error.new !== '' && (
                  <Text style={styles.form.error}>{error.new}</Text>
                )}
              </View>
              <View style={styles.form.inputContainer}>
                <Text style={styles.form.label}>Número benefício</Text>
                <TextInput
                  style={styles.form.input}
                  value={numeroBeneficio}
                  onChangeText={setNumeroBeneficio}
                  placeholder="Número benefício"
                />

                {error.confirm !== '' && (
                  <Text style={styles.form.error}>{error.confirm}</Text>
                )}
              </View>
              <View>
                <TouchableOpacity
                  style={styles.form.button}
                  onPress={handleSubmit}
                >
                  <Text style={styles.form.buttonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </Fragment>
  );
};

export default SalvarConvenioView;
