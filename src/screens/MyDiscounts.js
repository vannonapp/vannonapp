import React, {Component} from 'react';
import {View, Text} from 'react-native';

class MyDiscounts extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: '#DDD',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 17}}>
          Nenhum desconto encontrado para sua região
        </Text>
      </View>
    );
  }
}

export default MyDiscounts;
