import React from 'react';
import {View, Text} from 'react-native';

const BarcodeScanned = ({barCodeNumReceived}) => (
  <View style={{flex: 4}}>
    <Text style={styles.barcodeScanned}>
      Código de Barras Lido com Sucesso.
    </Text>
    <Text style={styles.barcodeNum}>
      Número:{' '}
      {barCodeNumReceived ? (
        <Text style={styles.num}>{barCodeNumReceived}</Text>
      ) : (
        false
      )}
    </Text>
  </View>
);

const styles = {
  barcodeScanned: {
    textAlign: 'center',
    color: '#1b4c8b',
    fontSize: 14,
  },
  barcodeNum: {
    textAlign: 'center',
    color: '#1b4c8b',
    fontSize: 14,
    fontWeight: 'bold',
  },
  num: {
    textAlign: 'center',
    color: '#1b4c8b',
    fontSize: 14,
    fontWeight: 'bold',
  },
};

export default BarcodeScanned;
