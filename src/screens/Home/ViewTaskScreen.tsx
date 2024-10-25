import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationProp, RouteProp, useRoute} from '@react-navigation/native';
import Icon, {Icons} from '../../components/Icons';
import {fonts} from '../../constants/fonts';
import DeleteModal from '../../components/DeleteModal';
import {getItem, setItem} from '../../utils/asyncStorage';
import Toast from 'react-native-toast-message';
import EditModal from '../../components/EditModal';
import {RootStackParamList, TaskProps} from '../../utils/type';

const ViewTaskScreen = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) => {
  const items = useRoute<RouteProp<RootStackParamList, 'ViewTask'>>().params;
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  console.log(items);
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type={Icons.AntDesign}
            name="closecircle"
            size={32}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={styles.title}>{items.title}</Text>
        <View style={styles.single}>
          <View style={styles.singleHeader}>
            <Icon
              type={Icons.MaterialIcons}
              name="timer"
              size={24}
              color="#fff"
              style={styles.singleIcon}
            />
            <Text style={styles.singleTitle}>Task Date :</Text>
          </View>
          <View style={styles.singleView}>
            <Text style={styles.singleViewText}>{items.date}</Text>
          </View>
        </View>
        <View style={styles.single}>
          <View style={styles.singleHeader}>
            <Icon
              type={Icons.FontAwesome5}
              name="tag"
              size={24}
              color="#fff"
              style={styles.singleIcon}
            />
            <Text style={styles.singleTitle}>Task Category :</Text>
          </View>
          <View style={styles.singleView}>
            <Icon
              type={
                items.category.id === 6 || items.category.id === 7
                  ? Icons.Feather
                  : Icons.FontAwesome
              }
              name={items.category.icon}
              color={items.category.iconColor}
              size={24}
            />
            <Text style={styles.singleViewText}>{items.date}</Text>
          </View>
        </View>
        <View style={styles.single}>
          <View style={styles.singleHeader}>
            <Icon
              type={Icons.Feather}
              name="flag"
              size={24}
              color="#fff"
              style={styles.singleIcon}
            />
            <Text style={styles.singleTitle}>Task Priority :</Text>
          </View>
          <View style={styles.singleView}>
            <Text style={styles.singleViewText}>{items.priority}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteContainer}
          onPress={() => setDeleteModal(true)}>
          <Icon
            type={Icons.FontAwesome5}
            name="trash"
            size={24}
            color="red"
            style={styles.singleIcon}
          />
          <Text style={styles.deleteTask}>Delete Task</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setEditModal(true)}>
        <Text style={styles.editButtonText}>Edit Task</Text>
      </TouchableOpacity>
      {deleteModal && (
        <DeleteModal
          task={items.title}
          close={() => setDeleteModal(false)}
          deleteTask={async () => {
            const temp = (await getItem('tasks')) as never as TaskProps[];
            if (temp) {
              let newTemp = temp.filter(item => {
                return item.title !== items.title;
              });
              await setItem('tasks', newTemp);
              setDeleteModal(false);
              Toast.show({
                type: 'success',
                text1: 'Deleted Successfully',
              });
              navigation.navigate('HomePage');
            }
          }}
        />
      )}
      {editModal && (
        <EditModal
          task={items.title}
          close={() => setDeleteModal(false)}
          onChange={e => setNewTask(e)}
          editTask={async () => {
            const temp = (await getItem('tasks')) as never as TaskProps[];
            if (temp) {
              let newTemp = temp.map(item => {
                if (item.title === items.title) {
                  item.title = newTask;
                }
                return item;
              });

              await setItem('tasks', newTemp);
              setEditModal(false);
              Toast.show({
                type: 'success',
                text1: 'Edited Successfully',
              });
              navigation.navigate('HomePage');
            }
          }}
        />
      )}
    </View>
  );
};

export default ViewTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.Regular,
    lineHeight: 21,
    letterSpacing: -0.32,
    color: '#fff',
  },
  containerHeader: {
    gap: 32,
    paddingHorizontal: 24,
  },
  single: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  singleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  singleIcon: {
    width: 24,
  },
  singleTitle: {
    fontFamily: fonts.Regular,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.32,
    color: '#fff',
  },
  singleView: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#363636',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    flexDirection: 'row',
  },
  singleViewText: {
    fontFamily: fonts.Regular,
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: -0.32,
    color: '#fff',
  },
  deleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deleteTask: {
    fontFamily: fonts.Regular,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.32,
    color: '#FF4949',
  },
  editButton: {
    borderRadius: 4,
    backgroundColor: '#8687E7',
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  editButtonText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: '#fff',
  },
});
