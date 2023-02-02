import 'react-native-get-random-values';
import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Dimensions} from 'react-native';
import {getTrackingStatus} from 'react-native-tracking-transparency';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';

import {BASE_URL} from '../commom/marketUrl';
import {labels} from '../commom/colors';

const AppWebView = ({navigation, params, route}) => {
  const [visible, setVisible] = useState(true);
  const [trackingStatus, setTrackingStatus] = useState(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(Dimensions.get('window').width);
    setHeight(Dimensions.get('window').height);

    async function fetchTrackingStatus() {
      try {
        const data = await AsyncStorage.multiGet(['@MinhaAPI:acceptCookies']);
        //const status = await getTrackingStatus();
        const acceptCookies = data[0][1];
        setTrackingStatus(acceptCookies === 'true' ? 'sim' : null);
      } catch (e) {
        console.error(e);
      }
    }
    fetchTrackingStatus();

    navigation.setOptions({
      title: params?.title || route.params?.title,
    });
  }, [Dimensions, setWidth, setHeight, navigation]);

  const hideSpinner = () => {
    setVisible(false);
  };

  const mountUrl = () => {
    let url = `${BASE_URL}/${params?.goTo || route.params?.goTo}`;
    if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
      return url;
    }

    url += `?RejeitarCookie=${trackingStatus}`;
    return url;
  }

  return (
    <View style={{flex: 1}}>
      <WebView
        onLoad={() => hideSpinner()}
        style={{flex: 1, marginTop: 0}}
        source={{
          uri: mountUrl(),
          method: params?.method || route.params?.method,
        }}
      />
      {visible && (
        <ActivityIndicator
          color={labels}
          style={{
            position: 'absolute',
            top: height - height / 2,
            left: width - width / 1.8,
          }}
          size="large"
        />
      )}
    </View>
  );
};

export default AppWebView;
