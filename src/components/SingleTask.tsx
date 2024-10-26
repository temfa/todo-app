import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {fonts} from '../constants/fonts';
import {truncateText} from '../utils/helper';
import {RadioButton} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {CategoryProp, RootStackParamList} from '../utils/type';
import Icon, {Icons} from './Icons';
import {Colors} from '../constants/color';

type Props = {
  task: string;
  id: number;
  action: () => void;
  done: boolean;
  date: any;
  priority: number;
  category: CategoryProp;
};

const SingleTask: FC<Props> = ({
  task,
  done,
  action,
  id,
  date,
  priority,
  category,
}) => {
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
          priority,
          category,
        })
      }>
      <RadioButton.Android
        value="new"
        status={done ? 'checked' : 'unchecked'}
        onPress={action}
        color={'#000'}
      />
      <View style={styles.singleTaskDetails}>
        <Text style={styles.singleTaskText}>{truncateText(task, 35)}</Text>
        <View style={styles.singleTaskInfo}>
          <Text style={styles.singleTaskText}>{date}</Text>
          <View style={styles.singleTaskSubInfo}>
            <View
              style={[
                {...styles.category},
                {backgroundColor: category.backgroundColor},
              ]}>
              <Icon
                type={
                  category.id === 6 || category.id === 7
                    ? Icons.Feather
                    : Icons.FontAwesome
                }
                name={category.icon}
                color={category.iconColor}
                size={14}
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
            <View style={styles.priority}>
              <Icon type={Icons.Feather} name="flag" color="#fff" size={14} />
              <Text style={styles.categoryText}>{priority}</Text>
            </View>
          </View>
        </View>
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

  singleTaskDetails: {
    gap: 6,
    flex: 1,
  },

  singleTaskInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  singleTaskText: {
    color: '#fff',
    fontFamily: fonts.Regular,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  singleTaskSubInfo: {
    gap: 12,
    flexDirection: 'row',
  },
  category: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  categoryText: {
    fontSize: 12,
    fontFamily: fonts.Regular,
    lineHeight: 21,
    letterSpacing: -0.32,
    color: Colors.white,
  },
  priority: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
    gap: 5,
  },
});
