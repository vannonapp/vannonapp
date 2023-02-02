import {AuthenticationActionTypes} from './authentication.types';

const INITIAL_STATE = {
  createUserResponse: {
    status: null,
    msg: null,
  },
  updateUserResponse: {
    status: null,
    msg: null,
  },
  authUserResponse: {
    status: null,
    msg: null,
  },
  confirmUserResponse: {
    status: null,
    msg: null,
  },
  changeUserPasswordResponse: {
    status: null,
    msg: null,
  },
  isLoadingCreateUser: false,
  isLoadingLoginUser: false,
  isLoadingConfirmteUser: false,
  isLoadingUpdateUser: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthenticationActionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        createUserResponse: action.payload,
        isLoadingCreateUser: false,
        name: '',
        password: '',
      };

    case AuthenticationActionTypes.CREATE_USER_ERROR:
      return {
        ...state,
        createUserResponse: action.payload,
        isLoadingCreateUser: false,
      };

    case AuthenticationActionTypes.LOADING_CREATE_USER:
      return {...state, isLoadingCreateUser: true};

    //aaaa
    case AuthenticationActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateUserResponse: action.payload,
        isLoadingUpdateUser: false,
      };

    case AuthenticationActionTypes.UPDATE_USER_ERROR:
      return {
        ...state,
        updateUserResponse: action.payload,
        isLoadingUpdateUser: false,
      };

    case AuthenticationActionTypes.LOADING_UPDATE_USER:
      return {...state, isLoadingUpdateUser: true};

    //bbbb

    case AuthenticationActionTypes.AUTH_USER_SUCCESS:
      return {
        ...state,
        authUserResponse: action.payload,
        isLoadingLoginUser: false,
      };

    case AuthenticationActionTypes.AUTH_USER_ERROR:
      return {
        ...state,
        authUserResponse: action.payload,
        isLoadingLoginUser: false,
      };

    case AuthenticationActionTypes.LOADING_LOGIN_USER:
      return {...state, isLoadingLoginUser: true};

    case AuthenticationActionTypes.CONFIRM_USER_SUCCESS:
      return {
        ...state,
        confirmUserResponse: action.payload,
        isLoadingConfirmteUser: false,
      };

    case AuthenticationActionTypes.CONFIRM_USER_ERROR:
      return {
        ...state,
        confirmUserResponse: action.payload,
        isLoadingConfirmteUser: false,
      };

    case AuthenticationActionTypes.LOADING_CONFIRM_USER:
      return {...state, isLoadingConfirmteUser: true};

    case AuthenticationActionTypes.RESET_AUTH_USER_ACTIONS:
      return {...state, ...INITIAL_STATE};

    default:
      return state;
  }
};
