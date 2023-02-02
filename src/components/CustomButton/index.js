import React from 'react';
import {TouchableHighlight, Text} from 'react-native';

import {buttons} from '../../commom/colors';

const CustomButton = ({
  label,
  textSize,
  handleSubmit,
  styles,
  buttonColor = buttons,
  disabled = false,
}) => {
  return (
    <TouchableHighlight
      style={ disabled ? customStyles.disabled : [customStyles.button, {backgroundColor: buttonColor}, styles] }
      activeOpacity={0.3}
      disabled={disabled}
      underlayColor={buttonColor}
      onPress={handleSubmit}>
      <Text
        style={{
          fontSize: textSize,
          color: '#FFF',
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        {label}
      </Text>
    </TouchableHighlight>
  );
};

const customStyles = {
  button: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#FFF',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#FFF',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default CustomButton;
