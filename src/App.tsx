/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';

import * as RNLocalize from 'react-native-localize';
import codePush from 'react-native-code-push';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {translate, setI18nConfig} from './i18n';
import {HomeScreen} from './pages/Home';
import {TestProjectOneScreen} from './pages/TestProjectOne';
// currently, it's not to hotUpdate by manual operation.
// const codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

const Stack = createNativeStackNavigator();

const App = () => {
  const forceUpdate = useState(0)[1];
  const handleLocalizationChange = useCallback(() => {
    setI18nConfig();
    forceUpdate(n => n + 1);
  }, [forceUpdate]);
  setI18nConfig();
  useEffect(() => {
    RNLocalize.addEventListener('change', handleLocalizationChange);
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, [handleLocalizationChange]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TestProjectOne">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="TestProjectOne"
          component={TestProjectOneScreen}
          options={{
            title: translate('historyMoodIndex'),
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontWeight: '500',
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default codePush(App);
