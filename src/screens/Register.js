import React from 'react';
import {View, ScrollView, Alert, Text, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {getTrackingStatus, requestTrackingPermission} from 'react-native-tracking-transparency';
import moment from 'moment';

import FormInputGorup from '../components/FormInputGorup';
import InputText from '../components/InputText';
import InputTextMasked from '../components/InputTextMasked';
import CustomButton from '../components/CustomButton';
import {
  moderateScale,
  commomState,
  customerInfosScalingState,
} from '../commom/scalignStates';
import {getCustomerData} from '../commom/customerData';
import configScaling from '../commom/configScaling';

import {createUser} from '../store/authentication/authentication.actions';
import {dateValidator} from '../commom/dateValidator';

const selectGender = {
  label: 'Seu Sexo',
  value: '',
};

class Register extends React.Component {
  state = {
    ...customerInfosScalingState,
    ...commomState,
    agreedPolicies: false,
    name: '',
    socialName: '',
    email: '',
    celphone: '',
    gender: '',
    cpf: '',
    cep: '',
    birthday: '',
    password: '',
    confirmPassword: '',
    passDoesNotMatch: false,
    genders: [
      {
        label: 'Masculino',
        value: 'M',
      },
      {
        label: 'Feminino',
        value: 'F',
      },
    ],
    camposInvalidos: [],
  };

  componentDidMount() {
    const {isUpdate} = this.props;

    configScaling(this.setState.bind(this));
    getCustomerData().then((data) => {
      if (data.cpf && !isUpdate) {
        this.props.navigation.replace('Menu', {...data});
      }

      if (isUpdate) this.setState({...data});
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isLoadingCreateUser)
      return {isLoadingCreateUser: props.isLoadingCreateUser};
    if (props.createUserResponse)
      return {createUserResponse: props.createUserResponse};

    return null;
  }

  pickerStyle = {
    inputIOS: {
      color: '#000',
      height: 40,
      fontSize: 17,
    },
    inputAndroid: {
      color: '#000',
      height: 30,
      fontSize: 17,
    },
    underline: {borderTopWidth: 0},
  };

  handleOnChange = (value, name) => {
    this.setState({[name]: value});
  };

  handleInputMasked = (formatted, extracted, name) => {
    this.setState({[name]: formatted});
  };

  validateFields() {
    const {
      name,
      email,
      celphone,
      cpf,
      password,
      confirmPassword,
    } = this.state;
    const camposInvalidos = [];

    if (name == '') {
      camposInvalidos.push('Nome');
    }
    if (password == '') {
      camposInvalidos.push('Senha');
    }
    if (confirmPassword == '') {
      camposInvalidos.push('Confirmar senha');
    }
    if (cpf == '') {
      camposInvalidos.push('CPF');
    }
    if (email == '') {
      camposInvalidos.push('Email');
    }
    if (celphone == '') {
      camposInvalidos.push('Celular');
    }
    this.setState({camposInvalidos});

    return camposInvalidos.length > 0;
  }

  sendData = async () => {
    const {
      name,
      email,
      socialName,
      celphone,
      gender,
      cpf,
      birthday,
      password,
      confirmPassword,
    } = this.state;
    const trackingStatus = await getTrackingStatus();
    if (trackingStatus !== 'authorized' && trackingStatus !== 'unavailable')
      await requestTrackingPermission();

    if (!!birthday && !dateValidator(birthday)) {
      Alert.alert(
        'Atenção',
        'Data de nascimento inválida. Ex: 11/11/1999',
        [
          {
            text: 'ENTENDI',
            onPress: () => false,
          },
        ],
        {cancelable: false},
      );
    }

    let dataNsment = moment(
      birthday.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3'),
      'DD/MM/YYYY',
    ).format('MM/DD/YYYY');

    const cel = celphone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');

    if (this.validateFields()) {
      return;
    } else {
      if (confirmPassword === password) {
        const theDataNsment = !!dataNsment && dataNsment != 'Invalid date' ? dataNsment : '01/01/1900';

        this.props.createUser({
          Id_Cliente: 0,
          Nome: name,
          Nome_Social: socialName,
          Data_Nascimento: theDataNsment,
          Sexo: gender,
          Tipo_Pessoa: 'F',
          CPF_CNPJ: cpf,
          Celular: cel,
          Aceita_Mailing: false,
          Senha: password,
          ConfirmaSenha: confirmPassword,
          Email: email,
        });
      } else {
        return this.setState({passDoesNotMatch: true});
      }
    }
  };

  renderResponseMessage = () => {
    const {createUserResponse} = this.props;

    if (!!createUserResponse.status) {
      if (createUserResponse.status === '400') {
        return <View
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
            borderWidth: 2,
            backgroundColor: '#f8d7da',
            borderColor: '#eaa2c1',
            padding: 10,
            borderRadius: 7,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 18, color: '#bd3924', fontWeight: 'bold'}}>
              Algo deu errado!
            </Text>
          </View>
          <Text
            style={{fontSize: 14, color: '#bd3924', fontWeight: 'bold'}}>
            {createUserResponse.msg}
          </Text>
        </View>;
      }
    }

    return false;
  };

  msgPassDoesNotMatch() {
    if (this.state.passDoesNotMatch) {
      Alert.alert(
        'Atenção',
        'As senhas digitadas não são iguais.',
        [
          {
            text: 'ENTENDI',
            onPress: () => this.setState({passDoesNotMatch: false}),
          },
        ],
        {cancelable: false},
      );
    }
  }

  render() {
    const {
      agreedPolicies,
      name,
      gender,
      genders,
      cpf,
      celphone,
      birthday,
      textScale,
      email,
      password,
      confirmPassword,
      socialName,
    } = this.state;

    return (
      <ScrollView style={{flex: 8, backgroundColor: '#FFF'}}>
        <View style={styles.form}>
          <FormInputGorup
            groupStyle={{flex: 1, marginBottom: 8}}
            label="NOME"
            textSize={moderateScale(textScale - 2)}>
            <InputText
              handleOnChange={this.handleOnChange}
              name="name"
              placeholder="Digite seu nome"
              value={name}
            />
          </FormInputGorup>

          <FormInputGorup
            groupStyle={{flex: 1, marginBottom: 8}}
            label="COMO GOSTARIA DE SER CHAMADO"
            textSize={moderateScale(textScale - 2)}>
            <InputText
              handleOnChange={this.handleOnChange}
              name="socialName"
              placeholder="(Opcional)"
              value={socialName}
            />
          </FormInputGorup>

          <FormInputGorup
            groupStyle={{flex: 1, marginBottom: 8}}
            label="E-MAIL"
            textSize={moderateScale(textScale - 2)}>
            <InputText
              handleOnChange={this.handleOnChange}
              name="email"
              placeholder="Digite seu e-mail"
              value={email}
            />
          </FormInputGorup>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginBottom: 10,
            }}>
            <View style={{flex: 3}}>
              <FormInputGorup
                label="SENHA"
                textSize={moderateScale(textScale - 2)}>
                <InputText
                  handleOnChange={this.handleOnChange}
                  name="password"
                  secureTextEntry
                  placeholder="Digite sua senha"
                  value={password}
                />
              </FormInputGorup>
            </View>

            <View style={{flex: 2}}>
              <FormInputGorup
                label="CONFIMAR SENHA"
                textSize={moderateScale(textScale - 2)}>
                <InputText
                  handleOnChange={this.handleOnChange}
                  name="confirmPassword"
                  secureTextEntry
                  placeholder="Confirme a senha"
                  value={confirmPassword}
                />
              </FormInputGorup>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginBottom: 10,
            }}>
            <View style={{flex: 3}}>
              <FormInputGorup
                label="DATA DE NASCIMENTO"
                textSize={moderateScale(textScale - 2)}>
                <InputTextMasked
                  mask={'[00]/[00]/[0000]'}
                  handleInputMasked={this.handleInputMasked}
                  name="birthday"
                  placeholder="Digite sua dt.nascimento"
                  value={birthday}
                />
              </FormInputGorup>
            </View>

            <View style={{flex: 2}}>
              <FormInputGorup
                label="SEXO"
                textSize={moderateScale(textScale - 2)}>
                <RNPickerSelect
                  placeholder={selectGender}
                  items={genders}
                  value={gender}
                  onValueChange={(value) => {
                    this.setState({
                      gender: value,
                    });
                  }}
                  style={this.pickerStyle}
                />
              </FormInputGorup>
            </View>
          </View>

          <FormInputGorup
            groupStyle={{flex: 1, marginBottom: 8}}
            label="CPF"
            textSize={moderateScale(this.state.textScale)}>
            <InputTextMasked
              mask={'[000].[000].[000]-[00]'}
              handleInputMasked={this.handleInputMasked}
              name="cpf"
              placeholder="Digite seu CPF"
              value={cpf}
              keyboardType="numeric"
            />
          </FormInputGorup>

          <FormInputGorup
            groupStyle={{flex: 1, marginBottom: 5}}
            label="CELULAR"
            textSize={moderateScale(this.state.textScale)}>
            <InputTextMasked
              mask={'([00]) [00000]-[0000]'}
              handleInputMasked={this.handleInputMasked}
              name="celphone"
              placeholder="Digite seu celular"
              value={celphone}
              keyboardType="numeric"
            />
          </FormInputGorup>
        </View>
        {this.state.camposInvalidos.length > 0 && (
          <View>
            <View>
              <View
                style={{
                  marginHorizontal: 20,
                  marginVertical: 10,
                  borderWidth: 2,
                  backgroundColor: '#f8d7da',
                  borderColor: '#eaa2c1',
                  padding: 10,
                  borderRadius: 7,
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#bd3924',
                      fontWeight: 'bold',
                    }}>
                    Algo deu errado!
                  </Text>
                </View>
                {this.state.camposInvalidos.map((campo) => (
                  <Text
                    style={{fontSize: 14, color: '#bd3924', fontWeight: 'bold'}}
                    key={campo}>
                    {campo} precisa ser preenchido(a)
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}
        <View style={styles.buttomContainer}>
          {!this.props.isLoadingCreateUser ? (
            <CustomButton  label="CONFIRMAR" handleSubmit={this.sendData} />
          ) : (
            <ActivityIndicator size="large" color="#000" />
          )}
        </View>
        {this.msgPassDoesNotMatch()}
        {!!this.props.createUserResponse && this.renderResponseMessage()}
      </ScrollView>
    );
  }
}

const styles = {
  form: {
    flex: 6,
    justifyContent: 'center',
    padding: 8,
  },
  buttomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  },
};

const mapStateToProps = (state) => ({
  createUserResponse: state.authentication.createUserResponse,
  isLoadingCreateUser: state.authentication.isLoadingCreateUser,
});

const mapDispatchToProps = (dispatch) => ({
  createUser: (data) => dispatch(createUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
