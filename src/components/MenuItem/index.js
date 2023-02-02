import React from 'react';
import {View, TouchableHighlight, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import MenuIcon from './MenuIcon';
import {menuInconLabelBG, menuInconBuscarLabelBG} from '../../commom/colors';

const MenuItem = ({
  label,
  isSearchProduct,
  icon,
  screenOpts,
  goToComponent,
  customerData = {},
  isUpdate = false,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={0.3}
        underlayColor={
          isSearchProduct ? menuInconBuscarLabelBG : menuInconLabelBG
        }
        onPress={() =>
          goToComponent
            ? navigation.navigate(goToComponent, {...customerData, isUpdate})
            : navigation.navigate('AppWebView', screenOpts)
        }>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: isSearchProduct
              ? menuInconBuscarLabelBG
              : menuInconLabelBG,
            height: '100%',
          }}>
          <MenuIcon isSearchProduct={isSearchProduct} icon={icon} />

          <View style={{flex: 9, justifyContent: 'center'}}>
            <Text style={styles.label}>{label}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#FFF',
    backgroundColor: 'red',
  },
  label: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#FFF',
  },
};

export default MenuItem;
