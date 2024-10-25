import React from 'react';
import Onboarding from '../../components/Onboarding';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../utils/type';

const FirstOnboardingScreen = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) => {
  return (
    <Onboarding
      image={require('../../assets/images/first.png')}
      title="Manage your tasks"
      text="You can easily manage all of your daily tasks in DoMe for free"
      page="first"
      next={() => navigation.navigate('SecondOnboarding')}
    />
  );
};

export default FirstOnboardingScreen;
