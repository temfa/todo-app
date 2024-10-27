import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../constants/color';
import Icon, {Icons} from './Icons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {fonts} from '../constants/fonts';
import {RootStackParamList} from '../utils/type';

type Props = {
  page: string;
};

const Login: FC<Props> = ({page}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type={Icons.SimpleLineIcons}
            name="arrow-left"
            size={24}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{page}</Text>
        <View style={styles.formContainer}>
          <View style={styles.formWrapper}>
            <View style={styles.formSingle}>
              <Text style={styles.formLabel}>Email Address</Text>
              <TextInput
                placeholder="Enter your Email Address"
                placeholderTextColor="#535353"
                style={styles.formInput}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.formSingle}>
              <Text style={styles.formLabel}>Password</Text>
              <TextInput
                placeholder="Enter your Password"
                placeholderTextColor="#535353"
                style={styles.formInput}
                keyboardType="visible-password"
              />
            </View>
            {page === 'Register' && (
              <View style={styles.formSingle}>
                <Text style={styles.formLabel}>Confirm Password</Text>
                <TextInput
                  placeholder="Enter your Password Again"
                  placeholderTextColor="#535353"
                  style={styles.formInput}
                  keyboardType="visible-password"
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.formButton}
            onPress={() => navigation.navigate('HomePage')}>
            <Text style={styles.formButtonText}>{page}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>Or</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.others}>
          <TouchableOpacity style={styles.social}>
            <Image source={require('../assets/images/google.png')} />
            <Text style={styles.socialText}>{page} with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.social}>
            <Image source={require('../assets/images/apple.png')} />
            <Text style={styles.socialText}>{page} with Apple</Text>
          </TouchableOpacity>
        </View>
      </View>
      {page === 'Login' ? (
        <Text style={styles.dont}>
          Don’t have an account?
          <Text style={{color: Colors.white}}>Register</Text>
        </Text>
      ) : (
        <Text style={styles.dont}>
          Already have an account?
          <Text style={{color: Colors.white}}>Login</Text>
        </Text>
      )}
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    paddingHorizontal: 24,
    paddingVertical: 20,
    // justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.Bold,
    color: Colors.white,
    marginTop: 41,
  },
  formContainer: {
    gap: 40,
    marginTop: 33,
  },
  formWrapper: {
    gap: 25,
  },
  formSingle: {
    gap: 8,
  },
  formLabel: {
    color: Colors.white,
    fontFamily: fonts.Regular,
    fontSize: 16,
  },
  formInput: {
    borderWidth: 0.8,
    borderColor: '#979797',
    borderRadius: 4,
    color: Colors.white,
    padding: 12,
    fontSize: 16,
    fontFamily: fonts.Regular,
  },
  formButton: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  formButtonText: {
    color: Colors.white,
    fontFamily: fonts.Regular,
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    justifyContent: 'space-between',
  },
  line: {
    width: '46%',
    height: 1,
    backgroundColor: '#979797',
  },
  dividerText: {
    color: '#979797',
    fontSize: 16,
    fontFamily: fonts.Regular,
    lineHeight: 32,
  },
  others: {
    marginTop: 24,
    gap: 17,
  },
  social: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
  },
  socialText: {
    fontFamily: fonts.Regular,
    fontSize: 16,
    color: Colors.white,
  },
  dont: {
    marginTop: 46,
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: '#979797',
    textAlign: 'center',
  },
});
