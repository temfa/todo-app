import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon, {Icons} from './Icons';
import {fonts} from '../constants/fonts';

const Header = () => {
  return (
    <View style={styles.container}>
      <Icon
        type={Icons.MaterialCommunityIcons}
        name="sort-reverse-variant"
        size={24}
        color="#fff"
      />
      <Text style={styles.header}>Home</Text>
      <Image
        source={require('../assets/images/user.png')}
        style={styles.image}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontFamily: fonts.Regular,
    letterSpacing: -0.5,
    lineHeight: 20,
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
});
