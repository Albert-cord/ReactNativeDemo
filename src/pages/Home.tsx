import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

function HomeScreen({navigation}: any) {
  return (
    <View style={styles.home}>
      <Text style={styles.homeText}>Home Screen</Text>
      <Button
        title="Go to TestProjectOne"
        onPress={() => navigation.navigate('TestProjectOne')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeText: {
    color: '#000000',
    fontSize: 18,
  },
});

export {HomeScreen};
