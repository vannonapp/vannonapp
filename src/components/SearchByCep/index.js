import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {transformStores} from '../../commom/transformStores';
import {getAddressByCep} from '../../commom/getAddressByCep';
import InputTextMasked from '../InputTextMasked';
import SelectStoreItem from '../SelectStoreItem';
import {BASE_URL} from '../../commom/marketUrl';
import CustomAlert from '../CustomAlert';

const SearchByCep = ({value, handleInputMasked, handleSearchStoreResults}) => {
  const [isLoaging, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const currentAddress = await getAddressByCep(value);

    fetch(`${BASE_URL}/obter-pracas-por-cep/${value}`, {
      method: 'POST',
    })
      .then((resp) => resp.json())
      .then(async (res) => {
        console.log(res)
        if (res?.length === 0) {
          CustomAlert('Ops!', 'Nenhuma filial foi encontrada perto de você');
          setIsLoading(false);
          return;
        }
        const sorted = await transformStores(res, currentAddress);

        setIsLoading(false);
        handleSearchStoreResults(sorted);
      })
      .catch((e) => {
        setIsLoading(false);
        console.error(e);
      });
  };

  return (
    <>
      <View style={{flex: 1, padding: 20, paddingHorizontal: 50}}>
        <InputTextMasked
          style={{
            backgroundColor: '#FFF',
            color: 'black',
            borderWidth: 1,
            borderRadius: 5,
            height: 48,
            fontSize: 18
          }}
          placeholderTextColor="black"
          mask={'[00000]-[000]'}
          handleInputMasked={handleInputMasked}
          name="cep"
          placeholder="Digite O CEP:"
          value={value}
        />

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
          }}>
          {isLoaging ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <SelectStoreItem
              label={'CONFIRMAR'}
              onPress={() => handleSubmit()}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default SearchByCep;
