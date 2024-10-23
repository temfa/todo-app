import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ButtonTab} from './src/utils/navigation';
import messaging from '@react-native-firebase/messaging';
import {ActivityIndicator, Linking, PermissionsAndroid} from 'react-native';
import {setItem} from './src/utils/asyncStorage';
import Toast from 'react-native-toast-message';

const NAVIGATION_IDS = ['Home', 'Settings'];

function buildDeepLinkFromNotificationData(data: any): string | null {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    // console.warn('Unverified navigationId', navigationId);
    return null;
  }
  if (navigationId === 'HomePage') {
    return 'myapp://HomePage';
  }
  if (navigationId === 'Settings') {
    return 'myapp://Settings';
  }

  return null;
}

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      HomePage: 'HomePage',
      Settings: 'Settings',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({url}: {url: string}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const foreground = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
    });
    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === 'string') {
        listener(url);
      }
    });
    const unsubscribeBack = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
      unsubscribeBack();
      foreground();
    };
  },
};

const App = () => {
  useEffect(() => {
    const requestUserPermission = async () => {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        const token = await messaging().getToken();
        await setItem('token', token);
        console.log('FCM token:', token);
      }
    };

    requestUserPermission();
  }, []);
  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator animating />}>
      <ButtonTab />
      <Toast />
    </NavigationContainer>
  );
};

export default App;
