import React, {Component} from 'react';
import {View} from 'react-native';

import UserDataHeader from '../components/UserDataHeader';
import UserDataBody from '../components/UserDataBody';

class CustomerData extends Component {
  render() {
    const {
      navigation,
      params,
    } = this.props;

    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <UserDataHeader
          navigation={navigation}
          isUpdate={params && params.isUpdate}
        />
        <UserDataBody
          navigation={navigation}
          isUpdate={params && params.isUpdate}
        />
      </View>
    );
  }
}

export default CustomerData;
