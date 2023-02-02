import React from 'react';
import {View, ImageBackground} from 'react-native';

import ReadBarcode from './ReadBarcode';
import SearchModal from '../../components/SearchModal';
import HeaderMessage from './HeaderMessage';
import SearchField from './SearchField';
import CrossLine from './CrossLine';
import configScaling from '../../commom/configScaling';
import {searchProductState} from '../../commom/scalignStates';

const bg = require('../../../assets/images/bg_buscar_produto.jpg');

class SearchProductHeader extends React.Component {
  state = {
    ...searchProductState,
    usarLocal: false,
    confirmBarCode: false,
  };

  componentDidMount() {
    configScaling(this.setState.bind(this));
  }

  handleOnChange = (value, name) => {
    this.setState({[name]: value});
  };

  handleInputMasked = (extracted, name) => {
    this.setState({[name]: extracted});
  };

  render() {
    const {
      OUwidth,
      txtMenu,
      textScale,
      msgMarginVertical,
      barcodeNumMarginVertical,
      OUmarginVertical,
    } = this.state;

    return (
      <View style={{flex: 6}}>
        <SearchModal
          setModalVisible={this.props.setModalVisible}
          modalVisible={this.props.modalVisible}
          barCodeNumReceived={this.props.barCode}
          handleCancelBarcode={this.props.handleCancelBarcode}
          handleConfirmBarcode={this.props.handleConfirmBarcode}
        />
        <View>
          <ImageBackground
            style={{
              height: '100%',
            }}
            source={bg}>
            <View style={styles.msgContainer}>
              <HeaderMessage
                barCodeNum={this.props.barCode}
                textScale={textScale}
                msgMarginVertical={msgMarginVertical}
                barcodeNumMarginVertical={barcodeNumMarginVertical}
              />
            </View>

            <View style={styles.searchContainer}>
              <ReadBarcode barCode={this.props.barCode} textScale={textScale} />

              <CrossLine
                OUwidth={OUwidth}
                txtMenu={txtMenu}
                OUmarginVertical={OUmarginVertical}
              />

              <SearchField
                name="productName"
                handleOnChange={this.props.handleProductName}
                value={this.props.productName}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = {
  msgContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  searchContainer: {flex: 4, justifyContent: 'center', alignItems: 'center'},
};

export default SearchProductHeader;
