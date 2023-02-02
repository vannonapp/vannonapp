import axios from 'axios';
import _ from 'lodash';

import {LocaleActionTypes} from './locale.types';

import {BASE_URL} from '../../commom/marketUrl';
const app = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
const getStore = (response) => ({
  type: LocaleActionTypes.GET_STATE,
  payload: response,
});

const getCities = (response) => ({
  type: LocaleActionTypes.GET_CITIES,
  payload: response,
});

const getDistrict = (response) => ({
  type: LocaleActionTypes.GET_DISTRICT,
  payload: response,
});

const getStores = (response) => ({
  type: LocaleActionTypes.GET_STORES,
  payload: response,
});

export const getStateAsync = () => {
  return (dispatch) => {
    dispatch({type: LocaleActionTypes.LOADING_GET_STATE});

    app
      .post('/obter-estados')
      .then((res) => {
        dispatch(getStore(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getCitiesAsync = (state) => {
  return (dispatch) => {
    dispatch({type: LocaleActionTypes.LOADING_GET_CITIES});

    axios
      .post(`${BASE_URL}/filtrar-cidades`, {estado: state})
      .then((res) => {
        dispatch(getCities(res.data));
      })
      .catch((err) => {});
  };
};

export const getDistrictAsync = (city) => {
  return (dispatch) => {
    dispatch({type: LocaleActionTypes.LOADING_GET_DISTRICT});

    axios
      .post(`${BASE_URL}/filtrar-bairros`, {cidade: city})
      .then((res) => {
        dispatch(getDistrict(res.data));
      })
      .catch((err) => {});
  };
};

export const getStoresAsync = (district, city) => {
  return (dispatch) => {
    dispatch({type: LocaleActionTypes.LOADING_GET_STORES});

    axios
      .post(`${BASE_URL}/filtrar-lojas`, {
        cidade: city,
        bairro: district,
      })
      .then((res) => {
        dispatch(getStores(res.data));
      })
      .catch((err) => {});
  };
};

export const resetState = () => {
  return (dispatch) => {
    dispatch({type: LocaleActionTypes.RESET_LOCALE_ACTIONS});
  };
};
