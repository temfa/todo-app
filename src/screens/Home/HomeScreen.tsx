/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import Icon, {Icons} from '../../components/Icons';
import {fonts} from '../../constants/fonts';
import SingleTask from '../../components/SingleTask';
import {TextInput} from 'react-native';
import {getItem} from '../../utils/asyncStorage';
import {useFocusEffect} from '@react-navigation/native';
import {Colors} from '../../constants/color';
import {TaskProps} from '../../utils/type';
import * as Haptic from 'react-native-haptic-feedback';

const HomeScreen = () => {
  const [data, setData] = useState<TaskProps[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    Haptic.trigger('impactMedium');
    setRefreshing(true);

    setTimeout(async () => {
      const tasks = await getItem('tasks');
      if (tasks) {
        setData(tasks as never as TaskProps[]);
      }
      setRefreshing(false);
    }, 2000);
  }, []);

  const sortArray = (item: TaskProps[]) => {
    let tempdata = item.sort((a: TaskProps) => {
      if (a.completed === true) {
        return 1;
      } else {
        return -1;
      }
    });
    return tempdata;
  };

  useEffect(() => {
    const getTasksFromLocal = async () => {
      const tasks = await getItem('tasks');
      if (tasks) {
        setData(tasks as never as TaskProps[]);
      }
      setLoading(false);
    };
    getTasksFromLocal();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const getTasksFromLocal = async () => {
        const tasks = await getItem('tasks');
        if (tasks) {
          setData(tasks as never as TaskProps[]);
        }
        setLoading(false);
      };
      getTasksFromLocal();
    }, []),
  );

  const filteredArray = sortArray(data)?.filter(e => {
    if (search === '') return e;
    else if (e?.title?.toLowerCase().includes(search.toLowerCase())) return e;
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerWrapper}>
        {loading ? (
          <ActivityIndicator size="large" color="#8687E7" />
        ) : data?.length === 0 ? (
          <View style={styles.noTaskContainer}>
            <Image source={require('../../assets/images/home.png')} />
            <Text style={styles.noTasksTitle}>
              What do you want to do today?
            </Text>
            <Text style={styles.noTasksText}>Tap + to add your tasks</Text>
          </View>
        ) : filteredArray.length === 0 ? (
          <View style={styles.noTaskContainer}>
            <Image source={require('../../assets/images/home.png')} />
            <Text style={styles.noTasksTitle}>Task Not found</Text>
          </View>
        ) : (
          <FlatList
            ListHeaderComponent={
              <View>
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
                    placeholder="Search for your task..."
                    placeholderTextColor="#6E6E6E"
                    onChangeText={e => setSearch(e)}
                  />
                </View>
              </View>
            }
            data={filteredArray}
            style={{height: '70%', marginBottom: 24}}
            keyExtractor={item => item.id as never as string}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <SingleTask
                id={item.id}
                date={item.date}
                task={item.title}
                action={() => {
                  let temp = [...data];
                  temp[index].completed = !temp[index].completed;
                  setData(temp);
                }}
                done={item.completed}
                priority={item.priority}
                category={item.category}
              />
            )}
            extraData={data}
            // eslint-disable-next-line react/no-unstable-nested-components
            ItemSeparatorComponent={() => <View style={{marginVertical: 8}} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingBottom: 24,
  },
  containerWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flex: 1,
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
  noTaskContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    height: '60%',
  },
  noTasksTitle: {
    fontFamily: fonts.Regular,
    fontSize: 20,
    color: Colors.white,
  },
  noTasksText: {
    fontFamily: fonts.Regular,
    fontSize: 16,
    color: Colors.white,
  },
});
