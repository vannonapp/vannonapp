import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {RNCamera as Camera} from 'react-native-camera';
import {StackActions} from '@react-navigation/native';
import _ from 'lodash';

class BarcodeScan extends Component {
  constructor(props) {
    super(props);

    const {height, width} = Dimensions.get('window');
    this.maskRowHeight = Math.round((height - 300) / 20);
    this.maskColWidth = (width - 300) / 2;

    this.onBarCodeRead = _.once(this.onBarCodeRead);
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: "ESCANEAR CÓDIGO"
    });
  }

  onBarCodeRead = e =>
    this.props.navigation.replace('SearchProduct', {
      barCode: e,
      showModal: true,
      title: "Buscar Produto"
    });

  render() {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.preview}
          onBarCodeRead={this.onBarCodeRead}
          ref={cam => (this.camera = cam)}>
          <View style={styles.maskOutter}>
            <View
              style={[
                {flex: this.maskRowHeight},
                styles.maskRow,
                styles.maskFrame,
              ]}
            />
            <View style={[{flex: 30}, styles.maskCenter]}>
              <View style={[{width: this.maskColWidth}, styles.maskFrame]} />
              <View style={styles.maskInner} />
              <View style={[{width: this.maskColWidth}, styles.maskFrame]} />
            </View>
            <View
              style={[
                {flex: this.maskRowHeight},
                styles.maskRow,
                styles.maskFrame,
              ]}
            />
          </View>
          <View style={{justifyContent: 'flex-end', alignItems: 'center'}}>
            <Text style={{fontSize: 16, color: '#FFF'}} />
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: {flexDirection: 'row'},
});

export default BarcodeScan;
