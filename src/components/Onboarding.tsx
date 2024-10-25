/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../constants/color';
import {fonts} from '../constants/fonts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {setItem} from '../utils/asyncStorage';
import {RootStackParamList} from '../utils/type';

type Props = {
  image: ImageSourcePropType;
  page: string;
  title: string;
  text: string;
  next: () => void;
};

const Onboarding: FC<Props> = ({image, page, title, text, next}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.first}>
          <TouchableOpacity
            onPress={async () => {
              navigation.navigate('Start');
              await setItem('onboarded', true);
            }}>
            <Text style={styles.skip}>SKIP</Text>
          </TouchableOpacity>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.second}>
          <View
            style={[
              {...styles.indicator},
              {backgroundColor: page === 'first' ? Colors.white : '#AFAFAF'},
            ]}
          />
          <View
            style={[
              {...styles.indicator},
              {backgroundColor: page === 'second' ? Colors.white : '#AFAFAF'},
            ]}
          />
          <View
            style={[
              {...styles.indicator},
              {backgroundColor: page === 'third' ? Colors.white : '#AFAFAF'},
            ]}
          />
        </View>
        <View style={styles.third}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {page === 'first' ? null : <Text style={styles.back}>BACK</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextContainer} onPress={next}>
          <Text style={styles.next}>
            {page === 'third' ? 'GET STARTED' : 'NEXT'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  containerHeader: {
    gap: 50,
  },
  first: {
    gap: 8,
  },
  skip: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: 'rgba(255, 255, 255,0.44)',
    textAlign: 'left',
  },
  image: {
    width: 213,
    height: 278,
    marginHorizontal: 'auto',
  },
  second: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    width: 26.28,
    height: 4,
    borderRadius: 56,
  },
  third: {
    gap: 42,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.Bold,
    fontSize: 32,
    color: Colors.white,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: Colors.white,
    width: 320,
    textAlign: 'center',
    lineHeight: 32,
  },
  containerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  back: {
    fontFamily: fonts.Regular,
    fontSize: 16,
    color: 'rgba(255, 255, 255,0.44)',
  },
  nextContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },

  next: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: Colors.white,
  },
});
