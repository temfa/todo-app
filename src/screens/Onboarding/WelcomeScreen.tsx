/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../constants/color';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../utils/type';
import {fonts} from '../../constants/fonts';
import {getItem} from '../../utils/asyncStorage';

const WelcomeScreen = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) => {
  const [showOnboarded, setShowOnboarded] = useState<boolean | null>(null);
  useEffect(() => {
    const checkIfAlreadyOnboarded = async () => {
      const onboarded = await getItem('onboarded');
      if (onboarded) {
        setShowOnboarded(false);
        setTimeout(() => {
          navigation.navigate('Start');
        }, 3000);
      } else {
        setShowOnboarded(true);
        setTimeout(() => {
          navigation.navigate('FirstOnboarding');
        }, 3000);
      }
    };
    checkIfAlreadyOnboarded();
  }, [navigation]);

  if (showOnboarded === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primaryBackground,
        }}>
        <ActivityIndicator size={'large'} color={'#fff'} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/todowelcome.png')} />
      <Text style={styles.text}>UpTodo</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBackground,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontFamily: fonts.Bold,
    fontSize: 40,
    color: Colors.white,
  },
});
