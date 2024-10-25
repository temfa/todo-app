import {StyleSheet, TextInput, View} from 'react-native';
import React, {FC, useState} from 'react';
import Modal from './Modal';

type Props = {
  task: string;
  close: () => void;
  editTask: () => void;
  onChange: (e: string) => void;
};

const EditModal: FC<Props> = ({task, editTask, close, onChange}) => {
  const [state, setState] = useState(task);
  return (
    <Modal
      page="Edit Task title"
      close={close}
      action={editTask}
      actionText="Edit">
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
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  addInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#fff',
    width: '100%',
  },
});
