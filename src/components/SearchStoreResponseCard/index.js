import React from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight} from 'react-native';

const logo = require('../../../assets/images/logo_login.png');

const SearchStoreResponseCard = ({
  storeName,
  contact,
  address,
  onPress,
  storeDistance,
}) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={0.3}
        underlayColor="#FFF"
        onPress={onPress}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={logo}
            style={{
              width: 40,
              height: 50,
            }}
          />

          <View style={styles.cardContainer}>
            <View style={{flex: 5}}>
              <Text style={{color: 'black', fontSize: 12}}>
                {storeName.toUpperCase()}
              </Text>
              <Text style={{color: 'black', fontSize: 12}}>{contact}:</Text>
              <Text style={{color: 'black', fontSize: 12}}>
                {address.replace('Avenida', 'Av.')}
              </Text>
            </View>
            <View
              style={{
                height: '100%',
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <Text style={{color: 'black', fontSize: 11, marginRight: 1}}>
                {storeDistance}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 15,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    borderRightColor: 'rgba(0, 0, 0, 0.5)',
    borderRightWidth: 1,
    height: 60,
    marginLeft: 3,
    paddingLeft: 5,
    marginBottom: 8,
  },
});

export default SearchStoreResponseCard;
