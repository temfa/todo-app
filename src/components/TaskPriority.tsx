/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import Modal from './Modal';
import Icon, {Icons} from './Icons';
import {fonts} from '../constants/fonts';
import {Colors} from '../constants/color';

type Props = {
  close: () => void;
  getActive: (e: number) => void;
};

const TaskPriority: FC<Props> = ({close, getActive}) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [active, setActive] = useState(1);
  return (
    <Modal page="Task Priority" close={close} action={close} actionText="Save">
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setActive(item);
              getActive(item);
            }}
            style={[
              {
                ...styles.taskSingle,
                backgroundColor: active === item ? Colors.primary : '#272727',
              },
            ]}>
            <Icon type={Icons.Feather} name="flag" color="#fff" size={20} />
            <Text style={styles.taskSingleText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.toString()}
        numColumns={5}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={{marginBottom: 16}} />}
      />
    </Modal>
  );
};

export default TaskPriority;

const styles = StyleSheet.create({
  taskSingle: {
    width: 64,
    height: 64,
    borderRadius: 6,
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  taskSingleText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: Colors.white,
    lineHeight: 21,
    letterSpacing: -0.32,
  },
});
