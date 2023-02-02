import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import configScaling from '../../commom/configScaling';
import {moderateScale} from '../../commom/scalignStates';
import {menuInconsBG, menuIncons, menuInconBuscarBG} from '../../commom/colors';

class MenuIcon extends React.Component {
  state = {paddingStyle: 0};

  componentDidMount() {
    configScaling(this.setState.bind(this));
  }

  render() {
    const {icon, isSearchProduct} = this.props;

    return (
      <View
        style={[
          styles.icon,
          {
            backgroundColor: isSearchProduct ? menuInconBuscarBG : menuInconsBG,
            paddingHorizontal: moderateScale(this.state.paddingStyle),
          },
        ]}>
        <Icon name={icon} size={30} color={menuIncons} />
      </View>
    );
  }
}

const styles = {
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default MenuIcon;
