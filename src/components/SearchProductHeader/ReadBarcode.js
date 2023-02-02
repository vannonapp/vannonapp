import React, {useEffect} from 'react';
import {View, TouchableHighlight, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {labels} from '../../commom/colors';
import {moderateScale} from '../../commom/scalignStates';

const ReadBarcode = ({textScale, barCode}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={0.3}
        underlayColor="#FFF"
        onPress={() => navigation.navigate('BarcodeScan')}>
        <View style={styles.placeHolder}>
          <Icon
            style={{marginRight: 5}}
            name="md-barcode"
            size={30}
            color={labels}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: moderateScale(textScale),
              color: labels,
              textAlign: 'center',
            }}>
            {barCode ? 'LER CÓDIGO NOVAMENTE' : 'LER CÓDIGO DE BARRAS'}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = {
  container: {
    width: '90%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 2,
  },
  icon: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeHolder: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ReadBarcode;
