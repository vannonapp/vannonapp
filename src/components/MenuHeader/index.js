import React from 'react';
import {View, Image} from 'react-native';

const logo = require('../../../assets/images/bg_portal.jpg');

const MenuHeader = () => (
  <View style={{flex: 2}}>
    <Image source={logo} style={{width: '100%', height: '100%'}} />
  </View>
);

export default MenuHeader;
