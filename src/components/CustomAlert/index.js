import {Alert} from 'react-native';

const CustomAlert = (title, message) =>
  Alert.alert(title, message, [{text: 'Entendi', onPress: () => false}], {
    cancelable: false,
  });

export default CustomAlert;
