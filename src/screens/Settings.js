import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getTrackingStatus} from 'react-native-tracking-transparency';
import {View, StyleSheet, Image, Text, ActivityIndicator} from 'react-native';

import {resetState} from '../store/locale/locale.actions';
import {getCustomerLocalization} from '../commom/getCustomerLocalization';
import SelectStoreItem from '../components/SelectStoreItem';
import SearchByAddress from '../components/SearchByAddress';
import SearchByCep from '../components/SearchByCep';
import SearchStoreResponseCard from '../components/SearchStoreResponseCard';
import {transformStores} from '../commom/transformStores';
import CustomScrollView from '../components/CustomScrollView';
import {labels} from '../commom/colors';
import {BASE_URL} from '../commom/marketUrl';
import {acronyms, drugstoreName} from '../commom/labels';
import CustomAlert from '../components/CustomAlert';

const logo = require('../../assets/images/logo_login.png');
const pin = require('../../assets/images/pin.jpg');
const people = require('../../assets/images/people.jpg');
class Settings extends Component {
  state = {
    searchBy: '',
    isLoadingCep: false,
    userLocal: null,
    currentCep: null,
    currentAddress: null,
    storeSearchResults: [],
    isSearchByCepSelected: false,
    isSearchByLocationSelected: false,
    isSearchByAddressSelected: false,
    cep: '',
  };

  componentWillUnmount() {
    this.props.resetState();
  }

  handleSearchStoreResults = (results) => {
    this.setState({storeSearchResults: results});
  };

  handleCurrentAddress = (address) => {
    this.setState({currentAddress: address});
  };

  mountUrl = (trackingStatus, cep) => {
    let url = `${BASE_URL}/obter-pracas-por-cep/${cep}`;
    if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
      return url;
    }

    url += `?RejeitarCookie=${trackingStatus}`;
    return url;
  }

  fetchCepFromGoogle = async (cep, currentAddress) => {
    const status = await getTrackingStatus();
    fetch(mountUrl(status, cep), {
      method: 'POST',
    })
      .then((resp) => resp.json())
      .then(async (res) => {
        const sorted = res?.length > 0 ? await transformStores(res, currentAddress): [];
        if (res?.length === 0) {
          CustomAlert('Ops!', 'Nenhuma filial foi encontrada perto de você');
        }
        this.setState({
          storeSearchResults: sorted,
          isSearchByLocationSelected: false,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  handleCurrentCep = (cep, currentAddress) => {
    this.setState({currentCep: cep}, () => {
      this.handleLoadingCep();
      this.fetchCepFromGoogle(cep, currentAddress);
    });
  };

  handleLoadingCep = () => {
    this.setState((prevState) => {
      return {isLoadingCep: !prevState.isLoadingCep};
    });
  };

  handleIsSearchByLocationSelected = () => {
    this.setState(prevState => ({isSearchByLocationSelected: !prevState.isSearchByLocationSelected}))
  }

  handleInputMasked = (formatted, extracted, name) => {
    this.setState({[name]: extracted});
  };

  renderLocalizationResults = () => {
    const {currentAddress, isSearchByLocationSelected} = this.state;
    if (isSearchByLocationSelected) {
      return <ActivityIndicator size="large" color={labels} />;
    }

    if (this.state.storeSearchResults.length > 0) {
      return this.state.storeSearchResults.map(
        ({
          Nome,
          Endereco,
          Cidade,
          Estado,
          Telefone,
          Numero,
          PracaId,
          Distance,
        }) => {
          return (
            <SearchStoreResponseCard
              key={PracaId}
              storeName={Nome}
              storeDistance={Distance?.text}
              contact={Telefone}
              address={Endereco + ', ' + Numero}
              addressTo={`${Endereco},${Cidade},${Estado}`}
              currentAddress={currentAddress}
              onPress={() => this.saveSelectedStore(PracaId)}
            />
          );
        },
      );
    } 
  };

  saveSelectedStore = async (pracaId) => {
    const {cpf} = this.props.params || {cpf: null};
    const {params} = this.props.route;

    try {
      await AsyncStorage.setItem('@MinhaAPI:PracaId', `${pracaId}`);

      this.props.navigation.replace('Menu', {
        pracaId,
        cpf: !!cpf ? cpf : params.cpf,
      });
    } catch (error) {}
  };

  renderSearch = () => {
    const {params, route, navigation} = this.props;
    const {cep, searchBy, storeSearchResults, currentCep} = this.state;

    if (storeSearchResults.length === 0) {
      switch (searchBy) {
        case 'cep':
          return (
            <SearchByCep
              currentCep={currentCep}
              value={cep}
              handleInputMasked={this.handleInputMasked}
              handleSearchStoreResults={this.handleSearchStoreResults}
            />
          );
        case 'address':
          return (
            <SearchByAddress
              params={params}
              route={route}
              navigation={navigation}
            />
          );
        default:
          return this.renderGuide();
      }
    }
  };

  renderGuide() {
    return (
      <View style={{flex: 1, paddingVertical: 10}}>
        <View style={{flex: 1}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 16,
              fontWeight: '600',
            }}>
            Como funciona o APP Delivery da {acronyms ?? drugstoreName}?
          </Text>
        </View>
        <View style={{flex: 6, flexDirection: 'row', padding: 5}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={pin}
              style={{
                marginBottom: 5,
                width: 78,
                height: 78,
              }}
            />
            <Text
              style={{
                paddingHorizontal: 8,
                textAlign: 'center',
                color: 'black',
                fontSize: 12,
                fontWeight: '600',
              }}>
              Encontre as lojas mais próximas de você clicando em um dos botões
              acima e selecione a loja que deseja fazer seu pedido
            </Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={people}
              style={{
                marginBottom: 5,
                width: 78,
                height: 78,
              }}
            />
            <Text
              style={{
                paddingHorizontal: 8,
                textAlign: 'center',
                color: 'black',
                fontSize: 12,
                fontWeight: '600',
              }}>
              Você faz sua compra pela{'\n'}loja on-line selecionada com opção
              de retirar seu pedido ou poderá escolher receber em sua casa
            </Text>
          </View>
        </View>
      </View>
    );
  }

  setSearchBy = (type) => {
    this.setState({searchBy: type});
  };

  render() {
    const {
      isSearchByCepSelected,
      isSearchByAddressSelected,
      isSearchByLocationSelected,
    } = this.state;

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
          <View
            style={{
              flex: 1.2,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
            <Image
              source={logo}
              style={{
                width: '100%',
              }}
            />
            <Text
              style={{
                marginTop: 3,
                color: labels,
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Selecione a loja que deseja fazer seu pedido{'\n'}
              Clicando em uma das opções abaixo
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <SelectStoreItem
              label={'CEP'}
              isSelected={isSearchByCepSelected}
              onPress={() => {
                this.setState(
                  {
                    storeSearchResults: [],
                    isSearchByCepSelected: true,
                    isSearchByAddressSelected: false,
                    isSearchByLocationSelected: false,
                  },
                  () => this.setSearchBy('cep'),
                );
              }}
            />

            <SelectStoreItem
              label={!this.state.isSearchByLocationSelected ? 'LOCALIZAÇÃO' : 'BUSCANDO...'}
              isSelected={isSearchByLocationSelected}
              onPress={() => {
                this.setState(
                  {
                    isSearchByCepSelected: false,
                    isSearchByAddressSelected: false,
                    isSearchByLocationSelected: true
                  },
                  () => {
                    this.handleLoadingCep();
                    getCustomerLocalization(
                      this.state.usarLocal,
                      this.handleCurrentCep,
                      this.handleLoadingCep,
                      this.handleCurrentAddress,
                      this.handleIsSearchByLocationSelected,
                    );
                  },
                );
              }}
            />

            <SelectStoreItem
              label={'ENDEREÇO'}
              isSelected={isSearchByAddressSelected}
              onPress={() => {
                this.setState(
                  {
                    storeSearchResults: [],
                    isSearchByCepSelected: false,
                    isSearchByAddressSelected: true,
                    isSearchByLocationSelected: false,
                  },
                  () => this.setSearchBy('address'),
                );
              }}
            />
          </View>
          {isSearchByLocationSelected ? (
            <View style={{flex: 3}}>
              <ActivityIndicator size="large" color="#00a859" />
            </View>
          ) : (
            <View style={{flex: 3}}>
              {this.state.storeSearchResults.length === 0 && (
                <View style={{flex: 1, justifyContent: 'center'}}>
                  {this.renderSearch()}
                </View>
              )}
              {this.state.storeSearchResults.length > 0 && (
                <View style={{flex: 1}}>
                  <CustomScrollView
                    style={{padding: 20}}
                    listLength={this.state.storeSearchResults.length}>
                    {this.renderLocalizationResults()}
                  </CustomScrollView>
                </View>
              )}
            </View>
          )}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const mapDispatchToProps = (dispatch) => ({
  resetState: () => dispatch(resetState()),
});

export default connect(null, mapDispatchToProps)(Settings);
