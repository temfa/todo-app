import {StyleSheet, Text, View} from 'react-native';
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
    <Modal
      page="Delete Task"
      close={close}
      action={deleteTask}
      actionText="Delete">
      <View>
        <Text style={styles.deleteModalText}>
          Are You sure you want to delete this task?
        </Text>
        <Text style={styles.deleteModalText}>Task title : {task}</Text>
      </View>
    </Modal>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  deleteModalText: {
    fontSize: 20,
    fontFamily: fonts.Medium,
    lineHeight: 30.5,
    letterSpacing: -0.5,
    color: '#fff',
    textAlign: 'center',
  },
});
