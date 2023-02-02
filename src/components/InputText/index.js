import React from 'react';
import {TextInput} from 'react-native';

const ImputText = ({value, handleOnChange,secureTextEntry = false, name, ...otherProps}) => {
  return (
    <TextInput
      style={{fontSize: 17}}
      secureTextEntry={secureTextEntry}
      onChangeText={(text) => handleOnChange(text, name)}
      {...otherProps}
    />
  );
};

export default ImputText;
