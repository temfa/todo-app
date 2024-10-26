import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import Icon, {Icons} from '../components/Icons';
import Modal from '../components/Modal';
import {fonts} from '../constants/fonts';
import Toast from 'react-native-toast-message';
import {getItem, setItem} from '../utils/asyncStorage';
import {NavigationProp} from '@react-navigation/native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TaskPriority from '../components/TaskPriority';
import Categories from '../components/Categories';
import {CategoryProp, RootStackParamList, TaskProps} from '../utils/type';

const AddTaskModal = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [priority, setPriority] = useState(1);
  const [priorityModal, setPriorityModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [day, setDay] = useState<any>('');
  const [category, setCategory] = useState<CategoryProp>({
    id: 0,
    name: '',
    icon: '',
    iconType: 'div',
    iconColor: '',
    backgroundColor: '',
    activeIconColor: '',
    activeBackgroundColor: '',
  });
  const [data, setData] = useState<TaskProps[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await getItem('tasks');
      if (tasks) {
        setData(tasks as never as TaskProps[]);
      }
    };
    getTasks();
  }, []);
  return (
    <>
      <Modal page="Add Task">
        <View style={styles.addContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              type={Icons.AntDesign}
              name="closecircle"
              size={32}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.addTitle}>Add Task</Text>
          <TextInput
            placeholder="Task"
            placeholderTextColor="#fff"
            style={styles.addInput}
            onChangeText={e => {
              setNewTask(e);
            }}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <View style={styles.addActionCont}>
            <View style={styles.addAction}>
              <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                <Icon
                  type={Icons.MaterialIcons}
                  name="timer"
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCategoryModal(true)}>
                <Icon
                  type={Icons.FontAwesome5}
                  name="tag"
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPriorityModal(true)}>
                <Icon type={Icons.Feather} name="flag" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.addSubmit}
              onPress={async () => {
                if (day === '' || newTask === '' || !category) {
                  Toast.show({
                    type: 'error',
                    text1: 'All fields are required',
                  });
                } else {
                  const sub = {
                    userId: 1,
                    id: data.length + 1,
                    title: newTask,
                    completed: false,
                    date: moment(day).calendar(),
                    priority,
                    category,
                  };
                  data.push(sub);
                  await setItem('tasks', data);
                  Toast.show({
                    type: 'success',
                    text1: 'Task Created Successfully',
                  });
                  navigation.goBack();
                  try {
                    const response = await fetch(
                      'https://inventory.shopdcloset.com/api/send-notifications',
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          token: await getItem('token'), // User's FCM token
                          newTask,
                        }),
                      },
                    );

                    const Response = await response.json();
                    if (response.ok) {
                      // Alert.alert('Success', Response.message);
                      console.log(Response.message);
                    } else {
                      console.log('Error', Response.error);
                    }
                  } catch (error) {
                    console.error('Error sending notification:', error);
                    console.log(
                      'Error',
                      'An error occurred while sending the notification',
                    );
                  }
                  setNewTask('');
                }
              }}>
              <Icon
                name="paper-airplane"
                color="#8687E7"
                size={24}
                type={Icons.Octicons}
              />
            </TouchableOpacity>
          </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          isDarkModeEnabled
          onConfirm={(date: any) => {
            setDay(date);
            setDatePickerVisibility(false);
          }}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </Modal>
      {priorityModal && (
        <TaskPriority
          close={() => setPriorityModal(false)}
          getActive={e => setPriority(e)}
        />
      )}
      {categoryModal && (
        <Categories
          close={() => setCategoryModal(false)}
          getCategory={e => setCategory(e)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  addContainer: {
    gap: 14,
    alignItems: 'flex-end',
  },
  addTitle: {
    fontSize: 20,
    fontFamily: fonts.Bold,
    width: '100%',
    // lineHeight: 64,
    color: '#FFFFFF',
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
  addActionCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  addAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  addSubmit: {
    width: 24,
  },
});

export default AddTaskModal;
