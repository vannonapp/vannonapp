import React from 'react';
import {View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-community/async-storage';
import FormInputGorup from '../../components/FormInputGorup';
import CustomButtom from '../../components/CustomButton';
import InputTextMasked from '../../components/InputTextMasked';
import InputText from '../../components/InputText';
import configScaling from '../../commom/configScaling';
import {
  moderateScale,
  commomState,
  customerInfosScalingState,
} from '../../commom/scalignStates';
import {storeData, getCustomerData} from '../../commom/customerData';

const selectGender = {
  label: 'Seu Sexo',
  value: '',
};

class UserDataBody extends React.Component {
  state = {
    ...customerInfosScalingState,
    ...commomState,
    name: '',
    gender: '',
    cpf: '',
    cep: '',
    birthday: '',
    genders: [
      {
        label: 'Masculino',
        value: 'masculino',
      },
      {
        label: 'Feminino',
        value: 'feminino',
      },
    ],
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
    this.setState({[name]: extracted});
  };

  handleSubmit = () => {
    const {name, gender, cpf, cep, birthday} = this.state;
    const {
      isUpdate,
      navigation: {replace},
    } = this.props;

    storeData(name, birthday, gender, cpf, cep).then(() => {
      !isUpdate && replace('Menu', {name, birthday, gender, cpf, cep});
    });
  };

  render() {
    const {name, gender, genders, cpf, cep, birthday, textScale} = this.state;

    return (
      <View style={{flex: 8, marginTop: 5}}>
        <View style={styles.form}>
          <FormInputGorup
            groupStyle={{flex: 1}}
            label="NOME"
            textSize={moderateScale(textScale)}>
            <InputText
              handleOnChange={this.handleOnChange}
              name="name"
              placeholder="Digite seu nome"
              value={name}
            />
          </FormInputGorup>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <View style={{flex: 3}}>
              <FormInputGorup
                label="DATA DE NASCIMENTO"
                textSize={moderateScale(textScale)}>
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
                textSize={moderateScale(this.state.textScale)}>
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
            groupStyle={{flex: 1}}
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
            groupStyle={{flex: 1}}
            label="CEP"
            textSize={moderateScale(this.state.textScale)}>
            <InputTextMasked
              mask={'[00000]-[000]'}
              handleInputMasked={this.handleInputMasked}
              name="cep"
              placeholder="Digite seu CEP"
              value={cep}
              keyboardType="numeric"
            />
          </FormInputGorup>
        </View>
        <View style={styles.buttomContainer}>
          <CustomButtom
            label="CONFIRMAR"
            textSize={moderateScale(this.state.textScale)}
            handleSubmit={() => this.handleSubmit()}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  form: {
    flex: 4,
    justifyContent: 'center',
    padding: 15,
  },
  buttomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default UserDataBody;
