import React from 'react';
import {TouchableHighlight, View, Text, StyleSheet} from 'react-native';
import { labels, SelectStoreItemSelected } from '../../commom/colors';

const SelectStoreItem = ({label, onPress, isSelected, ...otherProps}) => {
  return (
    <TouchableHighlight
      {...otherProps}
      activeOpacity={0.7}
      underlayColor="white"
      onPress={onPress}>
      <View
        style={[
          styles.container,
          {backgroundColor: isSelected ? SelectStoreItemSelected : labels},
        ]}>
        <Text style={styles.fontMenu}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 115,
    height: 45,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontMenu: {color: 'white', fontSize: 15, textAlign: 'center'},
});

export default SelectStoreItem;
