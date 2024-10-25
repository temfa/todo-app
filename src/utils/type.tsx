import {ElementType} from 'react';

export type CategoryProp = {
  id: number;
  name: string;
  icon: string;
  iconType: ElementType;
  iconColor: string;
  backgroundColor: string;
  activeIconColor: string;
  activeBackgroundColor: string;
};

export type TaskProps = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  date: any;
  priority: number;
  category: CategoryProp;
};

export type RootStackParamList = {
  HomePage: undefined;
  ViewTask: TaskProps;
  Settings: undefined;
  AddModal: undefined;
  Welcome: undefined;
  FirstOnboarding: undefined;
  SecondOnboarding: undefined;
  ThirdOnboarding: undefined;
  Start: undefined;
  Login: undefined;
  Register: undefined;
};
