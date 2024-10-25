/* eslint-disable react-native/no-inline-styles */
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import Modal from './Modal';
import Icon from './Icons';
import {fonts} from '../constants/fonts';
import {taskCategories} from '../utils/data';
import {CategoryProp} from '../utils/type';

type Props = {
  close: () => void;
  getCategory: (e: CategoryProp) => void;
};

const Categories: FC<Props> = ({close, getCategory}) => {
  const [selected, setSelected] = useState<CategoryProp>({
    id: 0,
    name: '',
    icon: '',
    iconType: 'div',
    iconColor: '',
    backgroundColor: '',
    activeIconColor: '',
    activeBackgroundColor: '',
  });
  return (
    <Modal
      page="Choose Category"
      close={close}
      action={close}
      actionText="Add Category">
      <FlatList
        data={taskCategories}
        numColumns={3}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          width: '90%',
          marginHorizontal: 'auto',
        }}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={{marginBottom: 16}} />}
        renderItem={({item}) => (
          <View
            style={{
              width: 80,
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 5,
            }}>
            <TouchableOpacity
              style={[
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: 4,
                  backgroundColor:
                    selected.id === item.id
                      ? item.activeBackgroundColor
                      : item.backgroundColor,
                  borderWidth: selected.id === item.id ? 2 : 0,
                  borderColor: '#fff',
                },
              ]}
              onPress={() => {
                setSelected(item);
                getCategory(item);
              }}>
              <Icon
                name={item.icon}
                type={item.iconType}
                size={30}
                color={
                  selected.id === item.id
                    ? item.activeIconColor
                    : item.iconColor
                }
              />
            </TouchableOpacity>
            <Text
              style={{fontFamily: fonts.Medium, fontSize: 14, color: 'white'}}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </Modal>
  );
};

export default Categories;
