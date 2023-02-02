import React from 'react';
import {Modal, View} from 'react-native';

import Body from './Body';

const SearchModal = ({
  modalVisible,
  barCodeNumReceived,
  setModalVisible,
  handleCancelBarcode,
  handleConfirmBarcode,
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          return false;
        }}>
        <View style={styles.bodyContainer}>
          <Body
            handleCancelBarcode={handleCancelBarcode}
            handleConfirmBarcode={handleConfirmBarcode}
            barCodeNumReceived={barCodeNumReceived}
            setModalVisible={setModalVisible}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  bodyContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.7)',
    justifyContent: 'center',
  },
};

export default SearchModal;
