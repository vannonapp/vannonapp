import React, {useEffect, useState} from 'react';
import {View, Text, TouchableHighlight, ImageBackground} from 'react-native';

import configScaling from '../../commom/configScaling2';
import {moderateScale} from '../../commom/scalignStates';

const bg = require('../../../assets/images/bg_cep_cpf.jpg');
const ping = require('../../../assets/images/ping.png');

const UserDataHeader = ({navigation, isUpdate}) => {
  const [textScale, setTextScale] = useState(0);

  useEffect(() => {
    if (isUpdate) {
      navigation.setOptions({
        headerShown: true,
      });
    }
    configScaling(setTextScale.bind(this), 'textScale');
  }, [configScaling]);

  return (
    <View style={{flex: 4}}>
      <ImageBackground style={{height: '100%', flex: 1}} source={bg}>
        <View style={styles.container}>
          <View style={styles.information}>
            <ImageBackground style={{width: isUpdate ? 150: 300, height: isUpdate ? 58: 106}} source={ping}>
              {!isUpdate && (
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableHighlight
                    activeOpacity={0.3}
                    underlayColor="#000"
                    onPress={() => navigation.replace('Menu')}>
                    <View style={styles.skipContainer}>
                      <Text style={{fontWeight: 'bold', color: '#FFF'}}>
                        PULAR
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              )}
            </ImageBackground>
            <Text
              style={[styles.text, {fontSize: moderateScale(textScale - 2)}]}>
              Para que possamos oferecer melhores resultados e oportunidades de
              compras, por favor informe seu CPF e seu CEP de entrega.
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = {
  container: {flex: 1, flexDirection: 'row', marginTop: 5},
  information: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  text: {
    paddingHorizontal: 35,
    color: '#FFF',
    textAlign: 'center',
  },
  skipContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
  },
};

export default UserDataHeader;
