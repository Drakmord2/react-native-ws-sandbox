import React from 'react';
import {Root} from 'native-base';
import {StatusBar} from 'react-native';
import {store} from './store';
import {Provider} from 'react-redux';
import Home from './pages/Home';

export default function App() {
    return (
        <Root>
            <Provider store={store}>
                <StatusBar barStyle="light-content" />
                <Home />
            </Provider>
        </Root>
    );
}
