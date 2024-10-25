import React from 'react';
import Onboarding from '../../components/Onboarding';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../utils/type';

const SecondOnboardingScreen = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) => {
  return (
    <Onboarding
      image={require('../../assets/images/second.png')}
      title="Create daily routine"
      text="In Uptodo  you can create your personalized routine to stay productive"
      page="second"
      next={() => navigation.navigate('ThirdOnboarding')}
    />
  );
};

export default SecondOnboardingScreen;
