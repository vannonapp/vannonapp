import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {moderateScale} from '../../commom/scalignStates';

const HeaderMessage = ({
  barCodeNum,
  textScale,
  msgMarginVertical,
  barcodeNumMarginVertical,
}) => {
  if (!barCodeNum) {
    return (
      <View style={{paddingTop: msgMarginVertical}}>
        <Text
          style={{
            fontSize: moderateScale(textScale + 1),
            color: '#FFF',
            textAlign: 'center',
            paddingHorizontal: 25,
          }}>
          Para buscar o produto na farmácia mais próxima fotografe seu código de
          barras ou digite o nome do produto, confirme sua localização ou
          confirme seu CEP de entrega e clique em buscar
        </Text>
      </View>
    );
  }

  return (
    <View style={{paddingTop: barcodeNumMarginVertical}}>
      <View style={{alignItems: 'center'}}>
        <Icon name="md-barcode" size={80} color="#FFC300" />
      </View>
      <Text
        style={{
          fontSize: moderateScale(textScale),
          color: '#FFF',
          textAlign: 'center',
        }}>
        Seu código de barras foi lido com sucesso.
      </Text>
      <Text
        style={{
          fontSize: moderateScale(textScale),
          color: '#FFF',
          textAlign: 'center',
        }}>
        Número capturado:
      </Text>
      <Text
        style={{
          fontSize: moderateScale(textScale + 2),
          color: '#FFF',
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        {barCodeNum}
      </Text>
    </View>
  );
};

export default HeaderMessage;
