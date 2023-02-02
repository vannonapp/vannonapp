import React, {Component} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import SearchProductHeader from '../components/SearchProductHeader';
import SearchProductBody from '../components/SearchProductBody';

class SearchProduct extends Component {
  state = {
    isLoadingCep: false,
    modalVisible: false,
    barCode: null,
    productName: '',
    cpf: '',
    pracaId: '',
  };

  componentDidMount() {
    //!!this.props.params && this.setState({cpf: this.props.params.cpf, pracaId: this.props.params.pracaId})
    this.getUserData();

    this.props.navigation.setOptions({
      title: 'BUSCAR PRODUTO',
    });
  }

  async getUserData() {
    const data = await AsyncStorage.multiGet([
      '@MinhaAPI:PracaId',
      '@MinhaAPI:cpf',
    ]);
    const pracaIdAsync = data[0][1];
    const cpfAsync = data[1][1];

    if (pracaIdAsync && cpfAsync) {
      this.setState({pracaId: pracaIdAsync, cpf: cpfAsync});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.barCode && prevState.barCode !== this.state.barCode) {
      this.setState({modalVisible: true});
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.route.params && nextProps.route.params.barCode) {
      if (prevState.barCode != nextProps.route.params.barCode.data) {
        return {
          barCode: nextProps.route.params.barCode.data,
        };
      }
    }

    if (nextProps.title) {
      return {
        title: nextProps.title,
      };
    }
    return null;
  }

  handleLoadingCep = () => {
    this.setState((prevState) => {
      return {isLoadingCep: !prevState.isLoadingCep};
    });
  };

  handleProductName = (value) => {
    this.setState({productName: value});
  };

  setModalVisible = () => {
    this.setState((preState) => {
      return {modalVisible: !preState.modalVisible};
    });
  };

  handleCancelBarcode = () => {
    this.props.navigation.setParams({barCode: null});
    this.setState({barCode: '', modalVisible: false});
  };

  handleConfirmBarcode = () => {
    this.setModalVisible();
  };

  render() {
    const {isLoadingCep, barCode, productName, modalVisible} = this.state;
    const {
      navigation,
      route: {params},
    } = this.props;

    return (
      <View style={{height: '100%', backgroundColor: '#FFF'}}>
        <SearchProductHeader
          handleProductName={this.handleProductName}
          productName={productName}
          barCode={barCode}
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
          handleCancelBarcode={this.handleCancelBarcode}
          handleConfirmBarcode={this.handleConfirmBarcode}
        />
        <SearchProductBody
          cpf={this.state.cpf}
          pracaId={this.state.pracaId}
          barCode={barCode}
          productName={productName}
          navigation={navigation}
          isLoadingCep={isLoadingCep}
          handleLoadingCep={this.handleLoadingCep}
          storedCustomerData={params ? params : {}}
        />
      </View>
    );
  }
}

export default SearchProduct;
