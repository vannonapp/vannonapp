import React from 'react';
import TextInputMask from 'react-native-text-input-mask';

const InputTextMasked = ({
  placeholder,
  value,
  handleInputMasked,
  name,
  ...otherProps
}) => {
  return (
    <TextInputMask
      style={{fontSize: 16}}
      placeholder={placeholder}
      value={value}
      onChangeText={(formatted, extracted) =>
        handleInputMasked(formatted, extracted, name)
      }
      {...otherProps}
    />
  );
};

export default InputTextMasked;
