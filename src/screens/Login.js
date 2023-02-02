import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {View, StyleSheet, Image, Text, ActivityIndicator} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getTrackingStatus, requestTrackingPermission} from 'react-native-tracking-transparency';
import StyledInput from '../components/StyledInput';
import CustomButton from '../components/CustomButton';
import TextButton from '../components/TextButton';
import {authUser} from '../store/authentication/authentication.actions';

const loginLogo = require('../../assets/images/logo_login.png');

class Login extends Component {
  state = {email: '', password: '', isSelected: false};

  componentDidMount() {
    this.getUserData();
  }

  async getUserData() {
    const data = await AsyncStorage.multiGet([
      '@MinhaAPI:PracaId',
      '@MinhaAPI:cpf',
    ]);
    const pracaIdAsync = data[0][1];
    const cpfAsync = data[1][1];

    if (pracaIdAsync && cpfAsync) {
      this.props.navigation.replace('Menu', {
        pracaId: pracaIdAsync,
        cpf: cpfAsync,
      });
    }
  }

  submitAuthentication = async () => {
    const trackingStatus = await getTrackingStatus();
    if (trackingStatus !== 'authorized' && trackingStatus !== 'unavailable')
      await requestTrackingPermission();
      
    const {authUser} = this.props;
    const {email, password} = this.state;

    authUser(email, password);
  };

  static getDerivedStateFromProps(props, state) {
    if (props.isLoadingLoginUser)
      return {isLoadingLoginUser: props.isLoadingLoginUser};
    if (props.authUserResponse)
      return {authUserResponse: props.authUserResponse};

    return null;
  }

  renderResponse = () => {
    const {authUserResponse, navigation} = this.props;

    if (authUserResponse.status === '400') {
      return (
        <View>
          <Text style={{color: 'red'}}>{authUserResponse.msg}</Text>
        </View>
      );
    } else if (authUserResponse.retorno) {
      navigation.replace('Settings', {cpf: authUserResponse.cpf});
    }

    return null;
  };

  render() {
    const {email, password, isSelected} = this.state;
    const {isLoadingLoginUser, authUserResponse} = this.props;

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
          <View style={styles.logoContainer}>
            <Image
              source={loginLogo}
              style={{
                width: '100%',
                height: 88,
              }}
            />
          </View>
          <View style={styles.inputsContainer}>
            <StyledInput
              keyboardType="email-address"
              iconName="ios-at"
              placeholder="Email"
              value={email}
              onChange={(value) => this.setState({email: value})}
            />

            <StyledInput
              iconName="lock-closed-outline"
              placeholder="Senha"
              value={password}
              secureTextEntry
              onChange={(value) => this.setState({password: value})}
            />

            <TextButton
              label="Esqueci minha senha"
              onPress={() =>
                this.props.navigation.push('AppWebView', {
                  goTo: 'esqueci-senha',
                  title: 'Recuperar Senha',
                })
              }
            />
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            {this.renderResponse()}
            {isLoadingLoginUser ? (
              <ActivityIndicator size="large" color="#00a859" />
            ) : (
              <CustomButton
                label="ENTRAR"
                handleSubmit={this.submitAuthentication}
              />
            )}
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{textAlign: 'center', color: '#000'}}>
              Ainda não tem conta?
            </Text>
            <CustomButton
              label="Cadastre-se agora!"
              buttonColor="#fb8642"
              handleSubmit={() => this.props.navigation.push('Cadastrar')}
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
    padding: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  inputsContainer: {
    flex: 1.5,
  },
});

const mapStateToProps = (state) => ({
  authUserResponse: state.authentication.authUserResponse,
  isLoadingLoginUser: state.authentication.isLoadingLoginUser,
});

const mapDispatchToProps = (dispatch) => ({
  authUser: (email, password) => dispatch(authUser(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
