import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  View,
  Text
} from 'react-native';
import {getTrackingStatus} from 'react-native-tracking-transparency';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import {BASE_URL} from '../commom/marketUrl';
const {width, height} = Dimensions.get('window');

class Catalog extends React.Component {
  state = {
    catalog: [],
    isLoading: false,
    noBannersFound: false
  };

  componentDidMount() {
    this.fetchCatalog();
  }

  mountUrl = (trackingStatus, pracaId) => {
    let url = `${BASE_URL}/banner-app/obter-banners/${pracaId}`;
    if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
      return url;
    }

    url += `?RejeitarCookie=${trackingStatus}`;
    return url;
  };

  fetchCatalog = async () => {
    const data = await AsyncStorage.multiGet(['@MinhaAPI:acceptCookies']);
    const acceptCookies = data[0][1];
    //const status = await getTrackingStatus();
    const {pracaId} = this.props.params;

    this.setState({isLoading: true});
    const resp = await axios.get(this.mountUrl(acceptCookies === 'true' ? 'authorized' : 'refused', pracaId));
    let catalog = resp.data;

    if (resp.status !== 200) {
      this.setState({noBannersFound: true});
      return;
    }
    catalog = catalog.map(x => ({...x, Link_Para_Pagina: x.Link_Para_Pagina
      .replace(`${BASE_URL}/`, '')}));
      
    const layoutHome = catalog.filter((item) => item.Layout === 'Home');
    const faixa = layoutHome
      .filter((item) => item.Posicao === 'Faixa')
      .sort((a, b) => a.Ordem - b.Ordem);
    const superior = layoutHome
      .filter((item) => item.Posicao === 'Superior')
      .sort((a, b) => a.Ordem - b.Ordem);
    const vitrine = layoutHome
      .filter((item) => item.Posicao === 'Vitrine')
      .sort((a, b) => a.Ordem - b.Ordem);
    const normal = catalog.filter((item) => item.Layout !== 'Home');

    this.setState({
      catalog: [...faixa, ...superior, ...vitrine, ...normal],
      isLoading: false,
      noBannersFound: false,
    });
  };

  render() {
    const {catalog, isLoading, noBannersFound} = this.state;
    const {navigation} = this.props;

    return (
      <ScrollView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          noBannersFound ? 
            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 18}}>Nenhuma oferta encontrada</Text>
            </View>
           :

            catalog.map(({Id, Banner_Url, Link_Para_Pagina, Altura, Largura}) => {
              const height = Altura !== 300 ? width*(Altura*0.9/Largura): width*(Altura*1.12/Largura)
              return (
                <TouchableHighlight key={Id} style={{
                  flexGrow: 1,
                  marginBottom: 8
                }}
                onPress={() =>
                  navigation.push('AppWebView', {
                    goTo: Link_Para_Pagina,
                    title: 'OFERTA ESPECIAL',
                  })
                }>
                  <Image
                    source={{uri: `${BASE_URL}${Banner_Url}`}}
                    style={{width: '100%', height}}
                  />

                </TouchableHighlight>
              )
})
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  }
});

export default Catalog;