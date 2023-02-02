import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';

import {getCepByGoogle} from './getCepByGoogle';
import {drugstoreName} from './labels';

export const getCustomerLocalization = async (
  usarLocal,
  handleCurrentCep,
  handleLoadingCep,
  handleCurrentAddress,
  handleIsSearchByLocationSelected,
) => {
  if (usarLocal) {
    return setState({
      latitude: null,
      longitude: null,
    });
  }

    try {
      let granted;
      if (Platform.OS === 'android') {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: `${drugstoreName} gostaria de acessar sua localização`,
            message:
              `${drugstoreName} gostaria de acessar sua localização` +
              'para poder te informar a filial mais próxima de você.',
            buttonNeutral: 'Perguntar depois',
            buttonNegative: 'Negar',
            buttonPositive: 'Permitir',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          handleIsSearchByLocationSelected();
          return;
        }

      } else if(Platform.OS === 'ios') {
        granted =  await Geolocation.requestAuthorization('whenInUse');
        if (granted !== 'granted') {
          handleIsSearchByLocationSelected();
          return;
        }
      }
      
    } catch (err) {
      console.warn(err);
    }

  return Geolocation.getCurrentPosition(
    (position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      getCepByGoogle(
        lat,
        long,
        handleCurrentCep,
        handleLoadingCep,
        handleCurrentAddress,
        handleIsSearchByLocationSelected
      );
    },
    (error) => {
      alert(error.message);
      handleIsSearchByLocationSelected();
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
}
