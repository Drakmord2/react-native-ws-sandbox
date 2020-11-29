import React from 'react';
import {View, Text, SectionList} from 'react-native';
import theme from '../config/style';

/*
 Component to debug WebSocket connections
*/
const ConnectionConsole = ({connected, received, sent}) => {
    let DATA = [
        {
            title: 'Connection',
            data: [connected ? 'Connected' : 'Disconnected'],
        },
        {
            title: 'Received Data',
            data: [received ? received : '[ No data ]'],
        },
        {
            title: 'Sent Data',
            data: [sent ? sent : '[ No data ]'],
        },
    ];

    const Item = ({title}) => (
        <View style={{backgroundColor: theme.dark.backgroundAlt, margin: 10}}>
            <Text
                style={{color: theme.dark.text, fontSize: 16, marginLeft: 10}}>
                {title}
            </Text>
        </View>
    );

    return (
        <View style={{flex: 1, marginTop: 10}}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => <Item title={item} />}
                renderSectionHeader={({section: {title}}) => (
                    <Text
                        style={{
                            color: theme.dark.text,
                            fontSize: 32,
                            margin: 10,
                            marginBottom: 0,
                        }}>
                        {title}
                    </Text>
                )}
            />
        </View>
    );
};

export default ConnectionConsole;
