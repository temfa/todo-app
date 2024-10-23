/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Modal from './Modal';
import {fonts} from '../constants/fonts';

type Props = {
  task: string;
  close: () => void;
  deleteTask: () => void;
};

const DeleteModal: FC<Props> = ({task, deleteTask, close}) => {
  return (
    <Modal>
      <View style={styles.deleteModalContainer}>
        <Text style={styles.deleteModalTitle}>Delete Task</Text>
        <View>
          <Text style={styles.deleteModalText}>
            Are You sure you want to delete this task?
          </Text>
          <Text style={styles.deleteModalText}>Task title : {task}</Text>
        </View>
        <View style={styles.deleteModalAction}>
          <TouchableOpacity
            onPress={close}
            style={{
              width: '45%',
            }}>
            <Text style={styles.deleteModalCancel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={deleteTask}
            style={styles.deleteModalDeleteCont}>
            <Text style={styles.deleteModalDeleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
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
  deleteModalText: {
    fontSize: 20,
    fontFamily: fonts.Medium,
    lineHeight: 30.5,
    letterSpacing: -0.5,
    color: '#fff',
    textAlign: 'center',
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
