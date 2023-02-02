import {LocaleActionTypes} from './locale.types';

const INITIAL_STATE = {
  states: null,
  isLoadingGetState: false,
  cities: null,
  isLoadingGetCities: false,
  districts: null,
  isLoadingGetDistrict: false,
  stores: null,
  isLoadingGetStores: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LocaleActionTypes.GET_STATE:
      return {...state, states: action.payload, isLoadingGetState: false};

    case LocaleActionTypes.LOADING_GET_STATE:
      return {...state, isLoadingGetState: true};

    case LocaleActionTypes.GET_CITIES:
      return {...state, cities: action.payload, isLoadingGetCities: false};

    case LocaleActionTypes.LOADING_GET_CITIES:
      return {...state, isLoadingGetCities: true};

    case LocaleActionTypes.GET_DISTRICT:
      return {
        ...state,
        districts: action.payload,
        isLoadingGetDistrict: false,
      };

    case LocaleActionTypes.LOADING_GET_DISTRICT:
      return {...state, isLoadingGetDistrict: true};

    case LocaleActionTypes.GET_STORES:
      return {...state, stores: action.payload, isLoadingGetStores: false};

    case LocaleActionTypes.LOADING_GET_STORES:
      return {...state, isLoadingGetStores: true};

    case LocaleActionTypes.RESET_LOCALE_ACTIONS:
      return {...state, ...INITIAL_STATE};

    default:
      return state;
  }
};
