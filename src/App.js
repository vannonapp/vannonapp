import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import routes from './routes';
import {navigationBar} from './commom/colors';
import store from './store/store';

const Stack = createStackNavigator();

function myiOSPromptCallback(permission) {
  // do something with permission value
}

const App = () => {
  useEffect(() => {
    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init('', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
    SplashScreen.hide();
  }, [OneSignal, SplashScreen]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Configurations">
          {routes.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.Component}
              options={{
                headerStyle: {
                  backgroundColor: navigationBar,
                },
                title: screen.hideNavBar ? null : screen.title,
                headerTintColor: '#FFF',
                headerTitleAlign: 'center',
                headerShown: !screen.hideNavBar,
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = {
  titleStyle: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#FFF',
  },
};

export default App;
