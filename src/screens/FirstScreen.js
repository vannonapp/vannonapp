import React, {Component} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import CustomButton from '../components/CustomButton';

const logo = require('../../assets/images/logo_login.png');

class FirstScreen extends Component {
  salvarAcceptCookies = async function (acceptCookies) {
    await AsyncStorage.multiSet([['@MinhaAPI:acceptCookies', acceptCookies.toString()]]);
  };

  submitLogin = async (acceptCookies) => {
    await this.salvarAcceptCookies(acceptCookies);
    this.props.navigation.push('Login');
  };

  render() {
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
            <Image source={logo} style={{width: '100%'}} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={{textAlign: 'center', color: '#000', fontSize: 16}}>
              Para melhor experiência em nosso App, recomendamos que aceite o Uso
              de Cookies. {"\n\n"} Assim a navegação do App será mais eficiente, caso não aceite
              os Cookies, o App não será funcional
            </Text>
            <View style={{flexDirection: 'row', padding: 0, marginVertical: 15 }}>
              <View style={{flex: 1}}>
                <Text style={{textAlign: 'center', color: '#000', fontSize: 14 }}>
                  Para saber mais visite nossa <Text style={{fontWeight: 'bold'}} onPress={() => this.props.navigation.push('PrivacyPolicy', {title: 'Políticas de Privacidade'}) }> Política de Privacidade</Text>
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', padding: 0, margin: 0}}>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <CustomButton
              label="Aceitar"
              handleSubmit={async () => await this.submitLogin(true)}
            />

            <CustomButton
              styles={{marginTop: 10, backgroundColor: '#e74c3c'}}
              label="Recusar"
              handleSubmit={async () => await this.submitLogin(false)}
            />
          </View>
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
  infoContainer: {
    alignItems: 'center',
    marginBottom: 8,
    padding: 20,
  },
});

export default FirstScreen;
