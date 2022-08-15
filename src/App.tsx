/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import codePush from 'react-native-code-push';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {translate} from './i18n';
import {HomeScreen} from './screens/Home';
import {TestProjectOneScreen} from './screens/TestProjectOne';
import {useSetI18nConfig} from './hooks/useSetI18nConfig';
// currently, it's not need to hotUpdate by manual operation.
// const codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

const Stack = createNativeStackNavigator();

const App = () => {
  useSetI18nConfig();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
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
