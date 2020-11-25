/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Button,
  SectionList
} from 'react-native';
import theme from './config/style';

const App = () => {
  const [enabled, setEnabled] = useState(false);
  const [ws, setWS] = useState(null);
  const [info, setInfo] = useState('Connecting to Server...');
  const [sent, setSent] = useState('');

  useEffect(()=>{
    init();
  }, [ws]);

  const init = () => {
    if (ws) {
      ws.onopen = () => {
        setEnabled(true);
        setInfo('Connected to Server.')
      };
  
      ws.onmessage = (e) => {
        setInfo(e.data);
      };
  
      ws.onerror = (e) => {
        setInfo(e.message);
        setEnabled(false);
      };
  
      ws.onclose = (e) => {
        setInfo(e.code +' '+ e.reason);
        setEnabled(false);
      };

      return;
    }
    
    setWS(new WebSocket('ws://192.168.15.7:3000/v1/comm/1/connect/1', "json"));
  };

  const handle_message = () => {
    let data = JSON.stringify({
      type: 'message', 
      message: 'React App connected to WS Server',
      date: Date.now()
    });

    ws.send(data);
    setSent(data);
  }

  let DATA = [
    {
      title: 'Connection',
      data: [enabled ? 'Connected' : 'Disconnected']
    },
    {
      title: 'Received Data',
      data: ['' + info]
    },
    {
      title: 'Sent Data',
      data: [sent ? sent : '[ No data ]']
    },
  ];

  const Item = ({ title }) => (
    <View style={{backgroundColor: theme.dark.backgroundAlt, margin: 10}}>
      <Text style={{color: theme.dark.text, fontSize: 16, marginLeft: 10}}>{title}</Text>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: theme.dark.background}}>
        <View style={{marginTop: 25, marginBottom: 10}}>
          <Text style={{color: theme.dark.text, fontWeight: 'bold', fontSize: 35, marginLeft: 10}}>WS Sandbox</Text>
        </View>
        {!enabled && <Button title="Connect" onPress={()=>setWS(null)}/>}
        <View style={{flex:1, marginTop: 10}}>
          <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item title={item} />}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{color: theme.dark.text, fontSize: 32, margin: 10, marginBottom:0}}>{title}</Text>
            )}
          />
        </View>

        {enabled && <Button title="Send Response" onPress={handle_message}/>}
      </SafeAreaView>
    </>
  );
};

export default App;
