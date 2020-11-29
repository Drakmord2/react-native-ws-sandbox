// Action Types
export const Types = {
    SET_BOARD: 'board/SET_BOARD',
    CLEAR: 'board/CLEAR',
};

export const INITIAL_STATE = {
    board: [
        {
            tile_id: 0,
            value: null,
        },
        {
            tile_id: 1,
            value: null,
        },
        {
            tile_id: 2,
            value: null,
        },
        {
            tile_id: 3,
            value: null,
        },
        {
            tile_id: 4,
            value: null,
        },
        {
            tile_id: 5,
            value: null,
        },
        {
            tile_id: 6,
            value: null,
        },
        {
            tile_id: 7,
            value: null,
        },
        {
            tile_id: 8,
            value: null,
        },
    ],
};

// Reducer
export default function conn(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.SET_BOARD:
            return {
                board: action.payload.board,
            };
        case Types.CLEAR:
            return INITIAL_STATE;
    }

    return state;
}

// Action Creators
export const Creators = {
    setBoard: board => ({
        type: Types.SET_BOARD,
        payload: {
            board,
        },
    }),
    clear: () => ({
        type: Types.CLEAR,
        payload: {},
    }),
};
