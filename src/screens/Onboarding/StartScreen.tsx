/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/color';
import Icon, {Icons} from '../../components/Icons';
import {fonts} from '../../constants/fonts';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../utils/type';

const StartScreen = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type={Icons.SimpleLineIcons}
            name="arrow-left"
            color={Colors.white}
            style={{height: 24, width: 24}}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to UpTodo</Text>
          <Text style={styles.text}>
            Please login to your account or create new account to continue
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signup}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.loginText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  head: {
    gap: 58,
    justifyContent: 'flex-start',
  },
  titleContainer: {
    justifyContent: 'center',
    gap: 26,
  },
  title: {
    fontFamily: fonts.Bold,
    fontSize: 32,
    color: 'rgba(255, 255, 255,0.87)',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: 'rgba(255, 255, 255,0.67)',
    textAlign: 'center',
    lineHeight: 32,
    width: 287,
    marginHorizontal: 'auto',
  },
  bottom: {
    gap: 28,
  },
  login: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 4,
  },
  loginText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: Colors.white,
  },

  signup: {
    borderColor: Colors.primary,
    borderWidth: 2,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 4,
  },
});
