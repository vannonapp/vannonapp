import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import CustomAlert from '../../components/CustomAlert';
import CustomButtom from '../../components/CustomButton';
import configScaling from '../../commom/configScaling';
import {moderateScale, searchProductState} from '../../commom/scalignStates';
import {labels} from '../../commom/colors';

class SearchProductBody extends React.Component {
  state = {
    ...searchProductState,
    cep: '',
    cpf: null,
    usarLocal: null,
    currentCep: null,
    isSendingRequest: false,
  };

  componentDidMount() {
    configScaling(this.setState.bind(this));
    this.setCustomerData();
  }

  componentWillUnmount() {
    this.setState({isSendingRequest: false});
  }

  setCustomerData = () => {
    const {storedCustomerData} = this.props;
    const {cpf, cep} = storedCustomerData
      ? storedCustomerData
      : {cpf: '', cep: ''};

    this.setState({cpf, cep});
  };

  handleInputMasked = (formatted, extracted, name) => {
    this.setState({[name]: extracted});
  };

  handleSubmit = () => {
    const {barCode, navigation, productName, cpf, pracaId} = this.props;
    let url = '';

    if (!barCode && !productName) {
      return CustomAlert(
        'Atenção!',
        'Informe o nome do medicamento ou código de barras.',
      );
    }

    this.setState({isSendingRequest: true});

    if (productName !== '') {
      url = `produto/consultarprodutonomeporpraca/${productName}/${pracaId}?CPF=${cpf}`;
    } else if (barCode !== '') {
      url = `produto/consultarcodigobarrasporpraca/${barCode}/${pracaId}?CPF=${cpf}`;
    }

    navigation.push('AppWebView', {
      method: 'GET',
      goTo: url,
      title: 'SUA BUSCA',
    });

    this.setState({isSendingRequest: false});
  };

  render() {
    const {textScale, isSendingRequest} = this.state;

    return (
      <View style={{flex: 3}}>
        <View style={styles.buttomContainer}>
          {isSendingRequest ? (
            <ActivityIndicator color={labels} size="large" />
          ) : (
            <CustomButtom
              handleSubmit={this.handleSubmit}
              label="CONFIRMAR"
              textSize={moderateScale(textScale)}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = {
  buttomContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
};

export default SearchProductBody;
