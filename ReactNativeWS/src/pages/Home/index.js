import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native';
import {Spinner, Button, Text, View} from 'native-base';
import theme from '../../config/style';
import TicTacToe from '../../components/tictactoe';
import Title from '../../components/title';
import Websocket from '../../services/websocket';

const App = () => {
    const [ws, setWS] = useState(null);
    const connected = useSelector(state => state.conn.connected);
    const done = useSelector(state => state.conn.done);

    const handle_connect = () => {
        if (!connected && !done) {
            setWS(new Websocket('/v1/comm/1/connect/1'));
        }
    };

    const handle_disconnect = () => {
        ws.close();
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.dark.background}}>
            <Title text="WS Sandbox" />

            {!connected && (
                <View style={{flex: 1, alignItems: 'center', marginTop: 60}}>
                    <Button rounded light onPress={handle_connect}>
                        <Text style={{fontWeight: 'bold'}}>Connect</Text>
                    </Button>
                </View>
            )}
            {done && ws.conn.readyState !== 1 && <Spinner />}

            {connected && done && <TicTacToe connection={ws} />}
            {connected && done && (
                <View style={{flex: 1, alignItems: 'center', marginTop: 60}}>
                    <Button rounded light onPress={handle_disconnect}>
                        <Text style={{fontWeight: 'bold'}}>Disconnect</Text>
                    </Button>
                </View>
            )}
        </SafeAreaView>
    );
};

export default App;
