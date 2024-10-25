/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import Icon, {Icons} from '../components/Icons';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {fonts} from '../constants/fonts';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ViewTaskScreen from '../screens/Home/ViewTaskScreen';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import AddTaskModal from '../screens/AddTaskScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
    name: 'Calender',
    component: SettingsScreen,
    type: Icons.MaterialIcons,
    iconName: 'calendar-month',
  },
  {
    name: 'Focus',
    component: HomeStack,
    type: Icons.SimpleLineIcons,
    iconName: 'clock',
  },
  {
    name: 'Profile',
    component: SettingsScreen,
    type: Icons.FontAwesome,
    iconName: 'user-o',
  },
];

export const ButtonTab = () => {
  const navigation = useNavigation();
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#fff',
          tabBarStyle: {
            height: 70,
            backgroundColor: '#363636',
            justifyContent: 'space-between',
            // elevation: 7,
          },
        }}>
        {buttonTabData?.slice(0, 2)?.map((item, index) => {
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
        <Tab.Screen
          name="New"
          component={AddTaskModal}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: props => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddTask' as never)}
                  {...props}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#8687E7',
                    height: Platform.OS === 'ios' ? 74 : 64,
                    width: Platform.OS === 'ios' ? 74 : 64,
                    top: Platform.OS === 'ios' ? -20 : -30,
                    borderRadius: Platform.OS === 'ios' ? 37 : 32,
                  }}>
                  <Icon
                    name="plus"
                    type={Icons.FontAwesome6}
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
              );
            },
          }}
        />
        {buttonTabData?.slice(2, 4)?.map((item, index) => {
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
    </>
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
