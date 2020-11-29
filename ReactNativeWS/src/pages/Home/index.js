import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView, Button} from 'react-native';
import {Spinner} from 'native-base';
import theme from '../../config/style';
import ConnectionConsole from '../../components/connection-console';
import Title from '../../components/title';
import Websocket from '../../services/websocket';

const App = () => {
    const [ws, setWS] = useState(null);
    const [sent, setSent] = useState('');
    const connected = useSelector(state => state.conn.connected);
    const received = useSelector(state => state.conn.received);
    const done = useSelector(state => state.conn.done);

    const handle_connect = () => {
        if (!connected && !done) {
            setWS(new Websocket('/v1/comm/1/connect/1'));
        }
    };

    const handle_message = () => {
        let data = JSON.stringify({
            type: 'message',
            message: 'React App using WebSockets',
            date: Date.now(),
        });

        ws.send(data);
        setSent(data);
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.dark.background}}>
            <Title text="WS Sandbox" />

            {!connected && <Button title="Connect" onPress={handle_connect} />}
            {done && ws.conn.readyState !== 1 && <Spinner />}

            <ConnectionConsole
                connected={connected}
                received={received}
                sent={sent}
            />

            {connected && (
                <Button title="Send Response" onPress={handle_message} />
            )}
        </SafeAreaView>
    );
};

export default App;
