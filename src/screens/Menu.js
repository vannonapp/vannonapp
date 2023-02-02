import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import AppWebView from '../screens/AppWebView';
import SearchProduct from '../screens/SearchProduct';
import Settings from '../screens/Settings';
import Catalog from '../screens/Catalog';

const Tab = createMaterialBottomTabNavigator();

class Menu extends React.Component {
  state = {pracaId: null, cpf: null};

  componentDidMount() {
    this.getUserData();
  }

  async getUserData() {
    const data = await AsyncStorage.multiGet([
      '@MinhaAPI:PracaId',
      '@MinhaAPI:cpf',
    ]);
    const pracaIdAsync = data[0][1];
    const cpfAsync = data[1][1];

    if (pracaIdAsync && cpfAsync) {
      this.setState({pracaId: pracaIdAsync, cpf: cpfAsync});
    }
  }

  render() {
    const {cpf, pracaId} = this.state;
    const {params} = this.props.route;

    return (
      <Tab.Navigator
        titleDisplayMode={{}}
        barStyle={{backgroundColor: '#F9F9F9'}}
        initialRouteName="LojaOnline">
        <Tab.Screen
          name="Catalog"
          options={{
            tabBarVisible: false,
            title: 'Ofertas',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="sale" color="#000" size={22} />
            ),
          }}>
          {(props) => (
            <Catalog
              {...props}
              params={{
                pracaId: params.pracaId ? params.pracaId : pracaId,
              }}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Settings"
          options={{
            tabBarLabel: 'Lojas',
            title: 'Lojas',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="map-marker"
                color="#000"
                size={22}
              />
            ),
          }}>
          {(props) => (
            <Settings
              {...props}
              params={{
                cpf: params.cpf ? params.cpf : cpf,
              }}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="LojaOnline"
          options={{
            tabBarLabel: 'Loja on-line',
            title: 'LojaOnline',
            tabBarIcon: ({color}) => (
              <View style={styles.container}>
                <View style={styles.outerCircle}>
                  <View style={styles.innerCircle}>
                    <MaterialCommunityIcons
                      name="store"
                      color="#F2F2F2"
                      size={22}
                    />
                  </View>
                </View>
              </View>
            ),
          }}>
          {(props) => (
            <AppWebView
              {...props}
              params={{
                goTo: `home-app/${params.cpf ? params.cpf : cpf}/${
                  params.pracaId ? params.pracaId : pracaId
                }`,
                title: 'Loja Online',
              }}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="SearchProduct"
          options={{
            tabBarLabel: 'Buscar',
            title: 'Buscar Produto',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="magnify" color={color} size={22} />
            ),
          }}>
          {(props) => (
            <SearchProduct
              {...props}
              params={{
                cpf: params.cpf ? params.cpf : cpf,
                pracaId: params.pracaId ? params.pracaId : pracaId,
              }}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Support"
          options={{
            tabBarLabel: 'Fale Conosco',
            title: 'Fale Conosco',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="forum" color="#000" size={22} />
            ),
          }}>
          {(props) => (
            <AppWebView
              {...props}
              params={{
                goTo: `central-atendimento/${params.cpf ? params.cpf : cpf}/${
                  params.pracaId ? params.pracaId : pracaId
                }`,
                title: 'Fale Conosco',
              }}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  outerCircle: {
    borderRadius: 40,
    width: 45,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  innerCircle: {
    borderRadius: 35,
    width: 35,
    height: 35,
    margin: 5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Menu;
