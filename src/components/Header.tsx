import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import Icon, {Icons} from './Icons';
import {fonts} from '../constants/fonts';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>To Do App</Text>
      {/* <Icon
        type={Icons.MaterialIcons}
        name="notifications"
        size={32}
        color="#fff"
      /> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontFamily: fonts.Regular,
    letterSpacing: -0.5,
    lineHeight: 20,
  },
});
