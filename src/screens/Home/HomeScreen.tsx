/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import Icon, {Icons} from '../../components/Icons';
import {fonts} from '../../constants/fonts';
import SingleTask from '../../components/SingleTask';
import {TextInput} from 'react-native';
import Modal from '../../components/Modal';
import {getItem, setItem} from '../../utils/asyncStorage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';

export type Props = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  time: any;
  date: any;
};

const HomeScreen = () => {
  const [data, setData] = useState<Props[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [day, setDay] = useState<any>('');
  const [time, setTime] = useState<any>('');

  const getTasksFromApi = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users/1/todos',
      );
      const json = await response.json();
      let tempData = json.splice(0, 10).map((item: Props) => {
        return {
          ...item,
          date: moment(new Date()).format('ll'),
          time: moment(new Date()).format('LT'),
        };
      });
      return tempData;
    } catch (error) {
      console.error(error);
    }
  };
  const getTasksFromLocal = async () => {
    const tasks = await getItem('tasks');
    if (tasks) {
      return tasks;
    }
  };

  const sortArray = (item: Props[]) => {
    let tempdata = item.sort((a: Props) => {
      if (a.completed === true) {
        return 1;
      } else {
        return -1;
      }
    });
    return tempdata;
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        const storedData = await getTasksFromLocal();
        if (storedData) setData(storedData as never as Props[]);
        else {
          const apiData = await getTasksFromApi();
          setData(apiData);
          setItem('tasks', apiData);
        }
      } catch (error) {
        console.log('Error during data initialization', error);
      } finally {
        setLoading(false);
      }
    };
    initializeData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const initializeData = async () => {
        try {
          const storedData = await getTasksFromLocal();
          if (storedData) setData(storedData as never as Props[]);
          else {
            const apiData = await getTasksFromApi();
            setData(apiData);
            setItem('tasks', apiData);
          }
        } catch (error) {
          console.log('Error during data initialization', error);
        } finally {
          setLoading(false);
        }
      };
      initializeData();
    }, []),
  );

  useEffect(() => {
    const updateLocal = async () => {
      await setItem('tasks', data);
    };
    updateLocal();
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.containerWrapper}>
        <Header />
        <View style={styles.searchContainer}>
          <Icon
            type={Icons.AntDesign}
            name="search1"
            color="#AFAFAF"
            size={24}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for foods, grocery, restaurant"
            placeholderTextColor="#6E6E6E"
            onChangeText={e => setSearch(e)}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#8687E7" />
        ) : (
          <FlatList
            data={sortArray(data)?.filter(e => {
              if (search === '') return e;
              else if (e?.title?.toLowerCase().includes(search.toLowerCase()))
                return e;
            })}
            style={{height: '70%', marginBottom: 24}}
            keyExtractor={item => item.id as never as string}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <SingleTask
                id={item.id}
                date={item.date}
                time={item.time}
                task={item.title}
                action={() => {
                  let temp = [...data];
                  temp[index].completed = !temp[index].completed;
                  setData(temp);
                }}
                done={item.completed}
              />
            )}
            extraData={data}
            // eslint-disable-next-line react/no-unstable-nested-components
            ItemSeparatorComponent={() => <View style={{marginVertical: 8}} />}
          />
        )}
        <TouchableOpacity
          onPress={() => setAddModal(true)}
          style={styles.addTask}>
          <Text style={styles.addTaskTitle}>Add New Task</Text>
        </TouchableOpacity>
      </View>
      {addModal && (
        <Modal>
          <View style={styles.addContainer}>
            <Text style={styles.addTitle}>Add Task</Text>
            <TextInput
              placeholder="Task"
              placeholderTextColor="#fff"
              style={styles.addInput}
              onChangeText={e => {
                setNewTask(e);
              }}
            />
            <View style={styles.addActionCont}>
              <View style={styles.addAction}>
                <TouchableOpacity onPress={() => setTimePickerVisibility(true)}>
                  <Icon
                    type={Icons.MaterialIcons}
                    name="timer"
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                  <Icon
                    type={Icons.FontAwesome5}
                    name="calendar-alt"
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.addSubmit}
                onPress={async () => {
                  if (day === '' || time === '' || newTask === '') {
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
                      date: day,
                      time: time,
                    };
                    setData([...data, sub]);
                    setAddModal(false);
                    Toast.show({
                      type: 'succecc',
                      text1: 'Task Created Successfully',
                    });
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
        </Modal>
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        isDarkModeEnabled
        onConfirm={(date: any) => {
          setDay(moment(date).format('ll'));
          setDatePickerVisibility(false);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        isDarkModeEnabled
        onConfirm={(date: any) => {
          setTime(moment(date).format('LT'));
          setTimePickerVisibility(false);
        }}
        onCancel={() => setTimePickerVisibility(true)}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  containerWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: 'space-between',
    height: '100%',
  },

  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 0.8,
    borderColor: '#979797',
    borderRadius: 4,
    height: 48,
    marginTop: 16,
    width: '100%',
    marginBottom: 20,
  },
  searchInput: {
    height: '100%',
    fontSize: 16,
    fontFamily: fonts.Regular,
    lineHeight: 16.8,
    color: '#fff',
    width: '92%',
  },
  addTask: {
    backgroundColor: '#8687E7',
    borderRadius: 6,
    alignItems: 'center',
    paddingVertical: 12,
  },
  addTaskTitle: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 14.4,
    fontFamily: fonts.Bold,
    letterSpacing: 1,
  },
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
