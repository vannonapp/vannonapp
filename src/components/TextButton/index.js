import React from 'react';
import {TouchableHighlight, Text} from 'react-native';

const TextButton = ({
  onPress,
  color = '#000',
  label,
  underlayColor = '#FFF',
  textStyle,
  marginVertical = 10,
  marginHorizontal = 5,
  styles,
}) => {
  return (
    <TouchableHighlight
      style={{marginVertical: marginVertical, alignItems: 'flex-end', justifyContent: 'center', ...styles}}
      activeOpacity={0.3}
      underlayColor={underlayColor}
      onPress={onPress}>
      <Text style={[color, textStyle]}>{label}</Text>
    </TouchableHighlight>
  );
};

export default TextButton;
