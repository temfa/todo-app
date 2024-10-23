import {StyleSheet, View} from 'react-native';
import React, {FC, ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

const Modal: FC<Props> = ({children}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    opacity: 0.8,
    justifyContent: 'center',
    top: 0,
    position: 'absolute',
  },
  container: {
    backgroundColor: '#363636',
    width: '100%',
    borderRadius: 6,
    padding: 16,
  },
});
