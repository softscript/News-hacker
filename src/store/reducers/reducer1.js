import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    counter: 0
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ACTION_TYPE:
            // return the state object that you want to return
            return state
        case actionTypes.ACTION_TYPE1:
            // return the state object that you want to return
            return state
        case actionTypes.ACTION_TYPE2:
            // return the state object that you want to return
            return state
        case actionTypes.ACTION_TYPE3:
            // return the state object that you want to return
            return state
    }
    return state;
};

export default reducer;