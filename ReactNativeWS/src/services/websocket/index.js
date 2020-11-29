import {Creators} from '../../store/ducks/conn';
import {store} from '../../store';

const dispatch = store.dispatch;

class Websocket {
    constructor(uri) {
        try {
            this.conn = new WebSocket('ws://192.168.15.7:3000' + uri, 'json');
            this.init();
        } catch (error) {
            dispatch(Creators.setConnected(false));
            dispatch(Creators.setDone(false));
            dispatch(
                Creators.setReceived({
                    message: 'Error connecting to server',
                    error: JSON.stringify(error),
                }),
            );
        }
    }

    init() {
        this.conn.onopen = () => {
            dispatch(Creators.setConnected(true));
            dispatch(Creators.setDone(true));
            dispatch(Creators.setReceived('Connected to Server'));
        };

        this.conn.onmessage = e => {
            dispatch(Creators.setReceived(e.data));
        };

        this.conn.onerror = e => {
            dispatch(Creators.setConnected(false));
            dispatch(Creators.setDone(false));
            dispatch(Creators.setReceived(JSON.stringify(e)));
        };

        this.conn.onclose = e => {
            dispatch(Creators.setConnected(false));
            dispatch(Creators.setDone(false));
            dispatch(Creators.setReceived(JSON.stringify(e)));
        };

        dispatch(Creators.setDone(true));
    }

    send(data) {
        this.conn.send(data);
    }
}

export default Websocket;
