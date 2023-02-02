import React from 'react';
import {View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Makiko} from 'react-native-textinput-effects';

import {labels} from '../../commom/colors';

const SearchField = ({value, handleOnChange, name}) => (
  <View style={styles.fieldInput}>
    <Makiko
      style={styles.makiko}
      label={'DIGITE NOME DO PRODUTO'}
      value={value}
      onChangeText={text => {
        handleOnChange(text, name);
      }}
      labelStyle={{fontSize: 16, marginLeft: 8}}
      iconClass={FontAwesomeIcon}
      iconName="comment"
      iconColor="white"
      inputStyle={{color: labels}}
    />
  </View>
);

const styles = {
  fieldInput: {
    width: '90%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 2,
  },
  makiko: {
    backgroundColor: '#FFF',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default SearchField;
