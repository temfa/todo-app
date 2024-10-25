/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {fonts} from '../constants/fonts';

type Props = {
  children: ReactNode;
  page: string;
  close?: () => void;
  action?: () => void;
  actionText?: string;
};

const Modal: FC<Props> = ({children, page, close, action, actionText}) => {
  return (
    <>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {page === 'Add Task' ? (
            children
          ) : (
            <View style={styles.deleteModalContainer}>
              <Text style={styles.deleteModalTitle}>{page}</Text>
              {children}
              <View style={styles.deleteModalAction}>
                <TouchableOpacity
                  onPress={close}
                  style={{
                    width: '45%',
                  }}>
                  <Text style={styles.deleteModalCancel}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={action}
                  style={styles.deleteModalDeleteCont}>
                  <Text style={styles.deleteModalDeleteText}>{actionText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </>
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
    elevation: 5,
    position: 'absolute',
    flex: 1,
  },
  container: {
    backgroundColor: '#363636',
    width: '100%',
    borderRadius: 6,
    padding: 16,
  },
  deleteModalContainer: {
    gap: 24,
  },
  deleteModalTitle: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.5,
    textAlign: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
    color: '#fff',
  },
  deleteModalAction: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 16,
  },
  deleteModalCancel: {
    color: '#8687E7',
    fontFamily: fonts.Regular,
    fontSize: 16,
    textAlign: 'center',
  },
  deleteModalDeleteCont: {
    backgroundColor: '#8687E7',
    paddingVertical: 12,
    borderRadius: 4,
    width: '45%',
  },
  deleteModalDeleteText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: '#fff',
  },
});
