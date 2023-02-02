import React from 'react';
import {View, ImageBackground, Text} from 'react-native';

import {moderateScale} from '../../commom/scalignStates';
import {bgOU, bordaOU} from '../../commom/colors';

const line = require('../../../assets/images/linha_buscar_produto.png');

const CrossLine = ({txtMenu, OUwidth, OUmarginVertical}) => (
  <View style={{marginVertical: OUmarginVertical, justifyContent: 'center'}}>
    <ImageBackground style={styles.line} source={line}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={[
            styles.orContainer,
            {
              width: moderateScale(OUwidth),
              height: moderateScale(OUwidth),
            },
          ]}>
          <Text
            style={[
              styles.orTxt,
              {
                fontSize: moderateScale(txtMenu),
              },
            ]}>
            OU
          </Text>
        </View>
      </View>
    </ImageBackground>
  </View>
);

const styles = {
  line: {
    height: 3,
    width: 600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orContainer: {
    padding: 7,
    backgroundColor: bgOU,
    borderWidth: 5,
    borderRadius: 50,
    borderColor: bordaOU,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orTxt: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
  },
};

export default CrossLine;
