import React from 'react';
import {View, Text} from 'react-native';

import {labels} from '../../commom/colors';

const FormInputGorup = ({label, textSize, children, groupStyle}) => (
  <View style={[groupStyle, {padding: 0}]}>
    <Text
      style={{
        color: labels,
        fontWeight: 'bold',
        marginLeft: 5,
        marginVertical: 0,
        padding: 0,
        fontSize: textSize,
      }}>
      {label}
    </Text>
    {children}
  </View>
);

export default FormInputGorup;
