/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import Modal from './Modal';
import {fonts} from '../constants/fonts';

type Props = {
  task: string;
  close: () => void;
  editTask: () => void;
  onChange: (e: string) => void;
};

const EditModal: FC<Props> = ({task, editTask, close, onChange}) => {
  const [state, setState] = useState(task);
  return (
    <Modal>
      <View style={styles.deleteModalContainer}>
        <Text style={styles.deleteModalTitle}>Edit Task title</Text>
        <View>
          <TextInput
            value={state}
            style={styles.addInput}
            onChangeText={e => {
              setState(e);
              onChange(e);
            }}
          />
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
            onPress={editTask}
            style={styles.deleteModalDeleteCont}>
            <Text style={styles.deleteModalDeleteText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;

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
  addInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#fff',
    width: '100%',
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
