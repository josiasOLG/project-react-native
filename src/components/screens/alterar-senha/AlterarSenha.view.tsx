/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import { styles } from './AlterarSenha.style';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Switch } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/interfaces/user-agreements.interface';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonFooterKeyboard from '../../reusable/button-footer-keyboard/buttonFooterKeyboard.reusable';
import useKeyboardVisibility from '../../../services/keyboardVisibilityService';
import alterarSenhaService from '../../../services/alterar-senha.service';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getItem, setItem } from '../../../services/storage/SecureStorage.service';

const AlterarSenhaView: React.FC = () => {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const dadosReceber = useSelector(
    (state: RootState) => state.dataLogin.dataLogin
  );
  const dadosLogin = useSelector((state) => state.data.data);
  const navigation = useNavigation();
  const { keyboardVisible, screenWidth } = useKeyboardVisibility();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ current: '', new: '', confirm: '' });

  const handleBackPress = () => {
    navigation.navigate('HomeView');
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

  const handleSubmit = async () => {
    const dados = await getItem('AUTH');
    if (
      currentPassword === '' ||
      newPassword === '' ||
      confirmPassword === ''
    ) {
      showToast(
        'error',
        'Atenção!',
        'Preencha todos os campos!'
      );
    } else if (newPassword !== confirmPassword) {
      showToast(
        'error',
        'Atenção!',
        'A nova senha e a confirmação não são iguais'
      );
    } else if(currentPassword !== dados?.password ){
      showToast(
          'error',
          'Atenção!',
          'Senha atual incorreta!'
      );
    }else{
      const arrayResult = {
        password: confirmPassword,
      };
      setLoading(true);
      alterarSenhaService.put(`/users/user/change-password`, arrayResult)
      .then(async () => {
        setItem('AUTH', {
          cpf: dadosLogin?.cpf,
          password: confirmPassword,
        });
        setLoading(false);
        showToast(
          'success',
          'Sucesso!',
          'Senha alterada com sucesso!'
        );
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          showToast(
            'error',
            'Ocorreu um erro!',
            errorMessage
          );
        }
      });
    }
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
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
              <View style={[styles.col11, styles.topo.centerContent]}>
                <Text style={styles.titulo}>Meus dados</Text>
              </View>
            </View>
            <View style={styles.form}>
              <View style={styles.form.containerTexto}>
                <Text style={styles.form.texto}>
                  Para sua segurança, digite sua senha atual
                </Text>
              </View>
              <View style={styles.form.inputContainer}>
                <Text style={styles.form.label}>Senha atual</Text>
                <TextInput
                  style={styles.form.input}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Senha atual"
                  secureTextEntry
                />
                {error.current !== '' && (
                  <Text style={styles.form.error}>{error.current}</Text>
                )}
              </View>

              <View style={styles.form.linha} />

              <View style={styles.form.containerTexto}>
                <Text style={styles.form.texto}>Digite sua senha nova</Text>
              </View>
              <View style={styles.form.inputContainer}>
                <Text style={styles.form.label}>Nova Senha</Text>
                <TextInput
                  style={styles.form.input}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Nova senha"
                  secureTextEntry
                />
                {error.new !== '' && (
                  <Text style={styles.form.error}>{error.new}</Text>
                )}
              </View>
              <View style={styles.form.inputContainer}>
                <Text style={styles.form.label}>Repetir Senha</Text>
                <TextInput
                  style={styles.form.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Repetir Senha"
                  secureTextEntry
                />
                {error.confirm !== '' && (
                  <Text style={styles.form.error}>{error.confirm}</Text>
                )}
              </View>
              <View>
                <TouchableOpacity
                  style={styles.form.button}
                  onPress={handleSubmit}
                  disabled={isLoading}
                >
                  <Text style={styles.form.buttonText}>
                    {!isLoading ? 'Concluir' : '...'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Fragment>
  );
};

export default AlterarSenhaView;
