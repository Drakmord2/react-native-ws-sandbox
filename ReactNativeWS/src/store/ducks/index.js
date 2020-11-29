import {combineReducers} from 'redux';
import conn from './conn';
import board from './board';

// Application Reducers
export default combineReducers({
    conn,
    board,
});
