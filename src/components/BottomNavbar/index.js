import React from 'react';
import {View} from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Menu from '../../screens/Menu';

const Tab = createMaterialBottomTabNavigator();

const BottomNavbar = () => {
  return (
    <View style={{flex:1}}>
      <Tab.Navigator initialRouteName="Menu" activeColor="#f0edf6" inactiveColor="#3e2465" >
        <Tab.Screen name="Menu" component={Menu} />
      </Tab.Navigator>
    </View>
  );
}

export default BottomNavbar;