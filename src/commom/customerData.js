import AsyncStorage from '@react-native-community/async-storage';
import CustomAlert from '../components/CustomAlert';
import Toast from 'react-native-simple-toast';

export const storeData = async (name, birthday, gender, cpf, cep) => {
  try {
    if (!cpf) {
      CustomAlert('Atenção!', 'Informe seu CPF');
    } else {
      await AsyncStorage.multiSet([
        ['@UserDados:name', name],
        ['@UserDados:birthday', birthday],
        ['@UserDados:gender', gender],
        ['@UserDados:cpf', cpf],
        ['@UserDados:cep', cep.toString()],
      ]);

      Toast.show('Dados salvos com sucesso!');
    }
  } catch (e) {
    CustomAlert('Erro!', 'Verifique os campos e tente novamente');
  }
};

export const getCustomerData = () => {
  return AsyncStorage.multiGet([
    '@UserDados:cpf',
    '@UserDados:cep',
    '@UserDados:name',
    '@UserDados:birthday',
    '@UserDados:gender',
  ])
    .then(data => {
      const cpf = data[0][1];
      const cep = data[1][1];
      const name = data[2][1];
      const birthday = data[3][1];
      const gender = data[4][1];

      return {cpf, cep, name, birthday, gender};
    })
    .catch(error =>
      CustomAlert('Erro!', 'Verifique os campos e tente novamente'),
    );
};
