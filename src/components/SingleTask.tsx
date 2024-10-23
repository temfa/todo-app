import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {fonts} from '../constants/fonts';
import {truncateText} from '../utils/helper';
import {RadioButton} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../utils/navigation';

type Props = {
  task: string;
  id: number;
  action: () => void;
  done: boolean;
  date: any;
  time: any;
};

const SingleTask: FC<Props> = ({task, done, action, id, date, time}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={styles.singleTasks}
      onPress={() =>
        navigation.navigate('ViewTask', {
          userId: 1,
          id,
          title: task,
          completed: done,
          date,
          time,
        })
      }>
      <RadioButton.Android
        value="new"
        status={done ? 'checked' : 'unchecked'}
        onPress={action}
        color={'#000'}
      />
      <View>
        <Text style={styles.singleTaskText}>{truncateText(task, 35)}</Text>
        <Text style={styles.singleTaskText}>
          {date} by {time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SingleTask;

const styles = StyleSheet.create({
  singleTasks: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#363636',
    borderRadius: 4,
    gap: 16,
  },

  circle: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  singleTaskText: {
    color: '#fff',
    fontFamily: fonts.Regular,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.32,
  },
});
