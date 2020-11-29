import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView, Button} from 'react-native';
import {Spinner} from 'native-base';
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

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.dark.background}}>
            <Title text="WS Sandbox" />

            {!connected && <Button title="Connect" onPress={handle_connect} />}
            {done && ws.conn.readyState !== 1 && <Spinner />}

            {connected && done && <TicTacToe connection={ws} />}
        </SafeAreaView>
    );
};

export default App;
