import React from 'react';
import {View} from 'react-native';

const Container = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
};

export default Container;
