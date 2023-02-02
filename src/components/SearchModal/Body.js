import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ModalButtom from './ModalButtom';
import BarcodeScanned from './BarcodeScanned';

const Body = ({
  barCodeNumReceived,
  setModalVisible,
  handleCancelBarcode,
  handleConfirmBarcode,
}) => (
  <View style={styles.container}>
    <View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <View style={{flex: 1}}>
          <Icon
            style={{marginRight: 5}}
            name="ios-checkmark-circle"
            size={40}
            color="#ed3237"
          />
        </View>

        <BarcodeScanned barCodeNumReceived={barCodeNumReceived} />
      </View>

      <View style={styles.buttonsContainer}>
        <ModalButtom
          onPress={() => handleCancelBarcode()}
          setModalVisible={setModalVisible}
          confirmBarCode={false}
          barCodeNumReceived={null}
          label="Canelar"
        />
        <ModalButtom
          onPress={() => handleConfirmBarcode()}
          setModalVisible={setModalVisible}
          confirmBarCode={true}
          barCodeNumReceived={barCodeNumReceived}
          label="Confirmar"
        />
      </View>
    </View>
  </View>
);

const styles = {
  container: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1b4c8b',
    paddingVertical: 8,
  },
};

export default Body;
