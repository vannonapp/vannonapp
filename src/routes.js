import Menu from './screens/Menu';
import Login from './screens/Login';
import SearchProduct from './screens/SearchProduct';
import AppWebView from './screens/AppWebView';
import MyDiscounts from './screens/MyDiscounts';
import BarcodeScan from './screens/BarcodeScan';
import Register from './screens/Register';
import Settings from './screens/Settings';
import Catalog from './screens/Catalog';
import PrivacyPolicy from './screens/PrivacyPolicy';
import FirstScreen from './screens/FirstScreen';

export default [
  {
    Component: FirstScreen,
    name: 'FirstScreen',
    title: 'Início',
    hideNavBar: true,
    margin: 62,
  },
  {
    Component: Login,
    name: 'Login',
    title: 'Login',
    hideNavBar: true,
    margin: 62,
  },
  {
    Component: Catalog,
    name: 'Catalog',
    title: 'Catalog',
    hideNavBar: true,
    margin: 62,
  },
  {
    Component: Settings,
    name: 'Settings',
    title: 'Settings',
    hideNavBar: true,
    margin: 62,
  },
  {
    Component: Register,
    name: 'Cadastrar',
    title: 'Cadastrar',
    hideNavBar: false,
    margin: 62,
  },
  {
    Component: SearchProduct,
    name: 'SearchProduct',
    title: 'BUSCAR PRODUTO',
    hideNavBar: false,
    margin: 62,
  },
  {
    Component: Menu,
    name: 'Menu',
    title: 'Menu',
    hideNavBar: true,
    reset: 'reset',
  },

  {
    Component: AppWebView,
    name: 'AppWebView',
    title: '',
    hideNavBar: false,
    margin: 62,
  },
  {
    Component: MyDiscounts,
    name: 'MyDiscounts',
    title: 'Meus Descontos',
    hideNavBar: false,
    margin: 62,
  },
  {
    Component: BarcodeScan,
    name: 'BarcodeScan',
    title: 'BUSCAR',
    hideNavBar: false,
    margin: 62,
  },
  {
    Component: PrivacyPolicy,
    name: 'PrivacyPolicy',
    title: 'POLÍTICAS DE PRIVACIDADE',
    hideNavBar: false,
    margin: 62,
  },
];
