import axios from 'axios';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

import {BASE_URL} from '../../commom/marketUrl';
import {AuthenticationActionTypes} from './authentication.types';

const salvarDadosUsuario = async function (response, email) {
  let cpf = response.data.cpf;
  await AsyncStorage.multiSet([
    ['@MinhaAPI:cpf', cpf],
    ['@MinhaAPI:email', email],
  ]);
};

export const createUser = (dados) => {
  return (dispatch) => {
    dispatch({type: AuthenticationActionTypes.LOADING_CREATE_USER});
    axios
      .post(`${BASE_URL}/home-app/cadastra-cliente`, dados)
      .then(() => {
        dispatch(authUser(dados.Email, dados.Senha));
      })
      .catch((err) => {
        const statusError = _.values(err)[2].status.toString();
        const arrayErrors = _.values(err)[2].data;
        console.log('CREATE_USER_ERROR: ', _.values(err));
        //console.log('CREATE_USER_ERROR_MSG: ', arrayErrors);
        dispatch({
          type: AuthenticationActionTypes.CREATE_USER_ERROR,
          payload: {
            status: statusError,
            msg: arrayErrors.message,
          },
        });
      });
  };
};

export const authUser = (email, senha) => {
  return (dispatch) => {
    dispatch({type: AuthenticationActionTypes.LOADING_LOGIN_USER});

    axios
      .post(`${BASE_URL}/home-app/login`, {
        Email: email,
        Senha: senha,
      })
      .then((res) => {
        console.log('AUTH_USER_SUCCESS: ', res.data);
        salvarDadosUsuario(res, email);
        dispatch({
          type: AuthenticationActionTypes.AUTH_USER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        const arrayErrors = _.values(err)[2].data;
        const statusError = _.values(err)[2].status.toString();

        dispatch({
          type: AuthenticationActionTypes.AUTH_USER_ERROR,
          payload: {
            status: statusError,
            msg: arrayErrors.message,
          },
        });
      });
  };
};

export const resetState = () => {
  return (dispatch) => {
    dispatch({type: AuthenticationActionTypes.RESET_AUTH_USER_ACTIONS});
  };
};
