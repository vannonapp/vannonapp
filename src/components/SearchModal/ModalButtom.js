import React from 'react';
import {TouchableHighlight, Text} from 'react-native';

const ModalButtom = ({label, ...otherProps}) => (
  <TouchableHighlight {...otherProps} underlayColor="#1b4c8b">
    <Text style={{color: '#FFF'}}>{label.toLocaleUpperCase()}</Text>
  </TouchableHighlight>
);

export default ModalButtom;
