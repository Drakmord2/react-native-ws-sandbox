/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Switch
} from 'react-native';
import theme from './config/style';

const App = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: theme.dark.background}}>
        <View style={{marginTop: 25}}>
          <Text style={{color: theme.dark.text, fontWeight: 'bold', fontSize: 30, marginLeft: 10}}>WS Sandbox</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: "center"}}>
          <Switch
            value={toggle}
            onValueChange={value => setToggle(value)}
          />
        </View>
        
      </SafeAreaView>
    </>
  );
};

export default App;
