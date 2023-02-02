import {combineReducers} from 'redux';

import auhenticationReducer from './authentication/authentication.reducer';
import localeReducer from './locale/locale.reducer';

export default combineReducers({
  authentication: auhenticationReducer,
  locale: localeReducer,
});
