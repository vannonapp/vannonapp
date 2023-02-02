import React, {Component} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';

import {
  getStateAsync,
  getCitiesAsync,
  getDistrictAsync,
  getStoresAsync,
  resetState,
} from '../../store/locale/locale.actions';
import SelectStoreItem from '../SelectStoreItem';
import CustomButton from '../CustomButton';
import { labels } from '../../commom/colors';

class SearchByAddress extends Component {
  state = {
    isLoadingGetState: false,
    isLoadingGetCities: false,
    isLoadingGetDistrict: false,
    isLoadingGetStores: false,
    state: null,
    itemsState: [
      {
        label: 'SP',
        value: 'SP',
      },
    ],
    city: null,
    itemsCity: [],
    district: null,
    itemsDistrict: [],
    selectedStore: null,
    itemsStores: [],
  };

  componentDidMount() {
    this.props.getState();
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  static getDerivedStateFromProps(props, state) {
    const formatStates = [];
    const formatCities = [];
    const formatDistricts = [];
    const formatStores = [];

    if (props.stores) {
      props.stores.forEach(({Nome, PracaId}) => {
        formatStores.push({label: Nome, value: PracaId});
      });

      return {
        stores: formatStores,
        itemsStores: formatStores,
      };
    }

    if (props.districts) {
      props.districts.forEach((state) => {
        formatDistricts.push({label: state, value: state});
      });

      return {
        districts: formatDistricts,
        itemsDistrict: formatDistricts,
      };
    }

    if (props.cities) {
      props.cities.forEach((state) => {
        formatCities.push({label: state, value: state});
      });

      return {
        cities: formatCities,
        itemsCity: formatCities,
      };
    }

    if (props.states) {
      props.states.forEach((state) => {
        formatStates.push({label: state, value: state});
      });

      return {
        states: formatStates,
        itemsState: formatStates,
      };
    }

    return null;
  }

  renderSelectStore = () => {
    const {itemsStores, selectedStore, isLoadingGetStores} = this.state;

    if (isLoadingGetStores) return <ActivityIndicator size="large" />;

    return (
      <RNPickerSelect
        placeholder={{
          label: 'Selecionar Loja',
          value: '',
        }}
        items={itemsStores}
        value={selectedStore}
        onValueChange={(value) => {
          this.setState({
            selectedStore: value,
          });
        }}
        style={this.pickerStyle}
      />
    );
  };

  pickerStyle = {
    inputIOS: {
      color: '#000',
      height: 40,
    },
    inputAndroid: {
      color: '#000',
      height: 40,
    },
    underline: {borderTopWidth: 0},
  };

  renderSelectLocale = (value, items, name, label, func, isGetStore) => {
    return (
      <RNPickerSelect
        key={name}
        placeholder={{
          label: label,
          value: '',
        }}
        items={items}
        value={value}
        onValueChange={(value) => {
          if (isGetStore) func(value, this.state.city);
          else func(value);

          this.setState({
            [name]: value,
          });
        }}
        style={this.pickerStyle}
      />
    );
  };

  saveSelectedStore = async (pracaId) => {
    const {cpf} = this.props.params || {cpf: null};
    const {params} = this.props.route;

    try {
      if (!this.state.selectedStore) {
        alert('Por favor, selecione uma loja');
      } else {
        await AsyncStorage.setItem('@MinhaAPI:PracaId', `${pracaId}`);

        this.props.navigation.replace('Menu', {
          pracaId,
          cpf: !!cpf ? cpf : params.cpf,
        });
      }
    } catch (error) {}
  };

  render() {
    const {
      itemsState,
      state,
      city,
      itemsCity,
      district,
      itemsDistrict,
      isLoadingGetState,
      isLoadingGetCities,
      isLoadingGetDistrict,
      selectedStore,
    } = this.state;

    return (
      <>
        <View
          style={{
            flex: 3,
            padding: 10,
            justifyContent: 'center',
          }}>
          <View style={styles.labelContainer}>
            <Text style={{color: 'white'}}>Selecione o Estado</Text>
          </View>
          {this.renderSelectLocale(
            state,
            itemsState,
            'state',
            'Selecione o Estado',
            this.props.getCities,
          )}

          <View style={styles.labelContainer}>
            <Text style={{color: 'white'}}>Selecione a cidade</Text>
          </View>
          {this.renderSelectLocale(
            city,
            itemsCity,
            'city',
            'Selecionar Cidade',
            this.props.getDistrict,
          )}

          <View style={styles.labelContainer}>
            <Text style={{color: 'white'}}>Selecione o bairro</Text>
          </View>
          {this.renderSelectLocale(
            district,
            itemsDistrict,
            'district',
            'Selecionar Bairro',
            this.props.getStores,
            true,
          )}

          <View style={styles.labelContainer}>
            <Text style={{color: 'white'}}>Selecione a loja</Text>
          </View>
          {this.renderSelectStore()}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SelectStoreItem
            label={'CONFIRMAR'}
            onPress={() => this.saveSelectedStore(selectedStore)}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  labelContainer: {
    width: '100%',
    height: 23,
    backgroundColor: labels,
    borderWidth: 2,
    borderColor: '#41719c',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  states: state.locale.states,
  cities: state.locale.cities,
  districts: state.locale.districts,
  stores: state.locale.stores,
});

const mapDispatchToProps = (dispatch) => ({
  getState: () => dispatch(getStateAsync()),
  getCities: (state) => dispatch(getCitiesAsync(state)),
  getDistrict: (city) => dispatch(getDistrictAsync(city)),
  getStores: (district, city) => dispatch(getStoresAsync(district, city)),
  resetState: () => dispatch(resetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchByAddress);
