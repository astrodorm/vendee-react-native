import { combineReducers } from 'redux';
import { INCREMENT_QUANTITY, DECREMENT_QUANTITY } from '../actions/actions';

const initialState = {
    count: 149
}


function products(state = initialState, action) {
    switch (action.type) {
        case INCREMENT_QUANTITY:
            return {
                count: state.count + 1
            };

        case DECREMENT_QUANTITY:
            return {
                count: state.count - 1
            };
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    products
})

export default rootReducer