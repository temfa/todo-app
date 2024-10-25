import React from 'react';
import Onboarding from '../../components/Onboarding';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../utils/type';
import {setItem} from '../../utils/asyncStorage';

const ThirdOnboardingScreen = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) => {
  return (
    <Onboarding
      image={require('../../assets/images/third.png')}
      title="Orgonaize your tasks"
      text="You can organize your daily tasks by adding your tasks into separate categories"
      page="third"
      next={async () => {
        navigation.navigate('Start');
        await setItem('onboarded', true);
      }}
    />
  );
};

export default ThirdOnboardingScreen;
