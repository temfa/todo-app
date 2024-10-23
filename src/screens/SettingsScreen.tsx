import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../constants/fonts';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
      <Text style={styles.text}>
        This is the settings screen, I dont know what to put there so I am just
        going to put a bunch of text there .
      </Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
        saepe laboriosam esse magnam recusandae unde nesciunt cum? Libero amet
        nesciunt tempore, accusamus, voluptas exercitationem eaque impedit,
        corporis cum aperiam atque.
      </Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
        saepe laboriosam esse magnam recusandae unde nesciunt cum? Libero amet
        nesciunt tempore, accusamus, voluptas exercitationem eaque impedit,
        corporis cum aperiam atque.
      </Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
        saepe laboriosam esse magnam recusandae unde nesciunt cum? Libero amet
        nesciunt tempore, accusamus, voluptas exercitationem eaque impedit,
        corporis cum aperiam atque.
      </Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    gap: 12,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.Regular,
  },
});
