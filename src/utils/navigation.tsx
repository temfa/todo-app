/* eslint-disable react/no-unstable-nested-components */
import React, {useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen, {Props} from '../screens/Home/HomeScreen';
import Icon, {Icons} from '../components/Icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {fonts} from '../constants/fonts';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ViewTaskScreen from '../screens/Home/ViewTaskScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  HomePage: undefined;
  ViewTask: Props;
  Settings: undefined;
};

const TabButton = (props: any) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef<any>(null);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      ref={viewRef}
      style={styles.container}>
      <View style={styles.navContainer}>
        <Icon
          type={item.type}
          name={item.iconName}
          color={focused ? '#fff' : '#6E6E6E'}
        />
        {focused ? <Text style={styles.navTitle}>{item.name}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: true}}
      initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewTask"
        component={ViewTaskScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const buttonTabData = [
  {
    name: 'Home',
    component: HomeStack,
    type: Icons.Octicons,
    iconName: 'home',
  },
  {
    name: 'Settings',
    component: SettingsScreen,
    type: Icons.Feather,
    iconName: 'settings',
  },
];

export const ButtonTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {
          height: 100,
          backgroundColor: '#363636',
          justifyContent: 'space-between',
          // elevation: 7,
        },
      }}>
      {buttonTabData?.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={({route}) => ({
              tabBarStyle: getTabBarStyle(route),
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            })}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const getTabBarStyle = (route: any): ViewStyle | undefined => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';

  const hideTabScreens = ['ViewTask'];

  if (hideTabScreens.includes(routeName)) {
    return {display: 'none'};
  }
  return {
    height: 70,
    backgroundColor: '#363636',
    justifyContent: 'space-between',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  navContainer: {
    alignItems: 'center',
    gap: 4,
  },

  navTitle: {
    fontFamily: fonts.Regular,
    fontSize: 12,
    color: '#fff',
    lineHeight: 14.4,
  },
});
