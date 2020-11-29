// Action Types
export const Types = {
    SET_CONNECTED: 'conn/SET_CONNECT',
    SET_RECEIVED: 'conn/SET_RECEIVED',
    SET_DONE: 'conn/SET_DONE',
    CLEAR: 'conn/CLEAR',
};

const INITIAL_STATE = {connected: false, done: false, received: ''};

// Reducer
export default function conn(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.SET_CONNECTED:
            return {
                connected: action.payload.connected,
                received: state.received,
                done: state.done,
            };
        case Types.SET_RECEIVED:
            return {
                connected: state.connected,
                received: action.payload.received,
                done: state.done,
            };
        case Types.SET_DONE:
            return {
                connected: state.connected,
                received: state.received,
                done: action.payload.done,
            };
        case Types.CLEAR:
            return INITIAL_STATE;
    }

    return state;
}

// Action Creators
export const Creators = {
    setConnected: connected => ({
        type: Types.SET_CONNECTED,
        payload: {
            connected,
        },
    }),
    setReceived: received => ({
        type: Types.SET_RECEIVED,
        payload: {
            received,
        },
    }),
    setDone: done => ({
        type: Types.SET_DONE,
        payload: {
            done,
        },
    }),
    clear: () => ({
        type: Types.CLEAR,
        payload: {},
    }),
};
