import { combineReducers } from 'redux';
import {
    ITEM_INCREMENT,
    ITEM_DECEREMENT,
    ITEM_ADD,
    ITEM_SELECT,
    LIST_ITEM_INCREMENT,
    LIST_ITEM_DECREMENT,
    ITEM_REMOVE,
    FETCH_PRODUCT,
    END_FETCH_PRODUCT,
    DELIVERY_METHOD,
    CREATE_USER_STARTED,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED,
    LOGIN_USER_STARTED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED
} from '../actions/actions';

const initialState = {
    // count: 149,
    products: [{ id: 1, thumbnail: "http://oja.ng/wp-content/uploads/2018/05/nasco-corn-flakes-350g.jpg", title: "Nasco Cornflakes 50g", price: 1234 }, { id: 2, thumbnail: "http://images.kglobalservices.com/www.kelloggs.com.au/en_au/product/product_449/prod_img-198128_corn-flakes-4.png", title: "Kellogs Cornflakes 70g", price: 9870 }],
    lists: [{ id: 1, quantity: 5 }],
    selectProductID: 0,
    selectProductQuantity: 0,
    searchText: "",
    isLoadingSearchBar: false,
    isDelivery: true,
    isPickup: false,
    isOrderSuccessful: false,
    isCreatingUser: false,
    user: [],
    error: null,
    isCreateUserError: false,
    isCreateUserSuccess: false,
    isLoginUserError: false,
    isLoginUserSuccess: false,
    isSigningInUser: false,
    responseStatus: 0,
    responseMessage: ""


}


function products(state = initialState, action) {
    switch (action.type) {
        case ITEM_INCREMENT:
            return Object.assign({}, state, {
                selectProductQuantity: state.selectProductQuantity + 1
            });
        case ITEM_DECEREMENT:
            return Object.assign({}, state, {
                selectProductQuantity: state.selectProductQuantity - 1
            });
        case ITEM_SELECT:
            return Object.assign({}, state, {
                selectProductID: action.id,
                selectProductQuantity: action.quantity
            });
        case FETCH_PRODUCT:
            return Object.assign({}, state, {
                searchText: action.text,
                isLoadingSearchBar: true
            });
        case END_FETCH_PRODUCT:
            return Object.assign({}, state, {
                isLoadingSearchBar: false
            });
        default:
            return state;
    }
}


function users(state = initialState, action) {
    switch (action.type) {
        case CREATE_USER_STARTED:
            return Object.assign({}, state, {
                isCreatingUser: true,
                isCreateUserError: false
            });
        case LOGIN_USER_STARTED:
            return Object.assign({}, state, {
                isSigningInUser: true,
                isLoginUserError: false
            });
        case CREATE_USER_SUCCESS:
            return Object.assign({}, state, {
                isCreatingUser: false,
                error: null,
                isCreateUserError: false,
                isCreateUserSuccess: true,
                user: [...state.user, action.payload]
            });

        case LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                isSigningInUser: false,
                error: null,
                isLoginUserError: false,
                isLoginUserSuccess: true,
                user: [...state.user, action.payload]
            });
        case CREATE_USER_FAILED:
            return Object.assign({}, state, {
                isCreatingUser: false,
                isCreateUserError: true,
                isCreateUserSuccess: false,
                responseStatus: action.payload.error.status,
                responseMessage: action.payload.error.message
            });
        case LOGIN_USER_FAILED:
            return Object.assign({}, state, {
                isSigningInUser: false,
                isLoginUserError: true,
                isLoginUserSuccess: false,
                responseStatus: action.payload.error.status,
                responseMessage: action.payload.error.message
            });
        default:
            return state;
    }
}


function delivery(state = initialState, action) {
    switch (action.type) {
        case DELIVERY_METHOD:
            return Object.assign({}, state, {
                isDelivery: action.isDelivery,
                isPickup: action.isPickup
            });
        default:
            return state;
    }
}





function lists(state = initialState, action) {
    switch (action.type) {
        case ITEM_ADD:
            return Object.assign({}, state, {
                lists: [
                    ...state.lists,
                    {
                        id: action.id,
                        quantity: 1,
                    }
                ]
            });
        case ITEM_REMOVE:
            return Object.assign({}, state, {
                lists: [
                    ...state.lists.slice(0, action.index),
                    ...state.lists.slice(action.index + 1)
                ]
            });
        case LIST_ITEM_INCREMENT:
            return Object.assign({}, state, {
                lists: state.lists.map((list, index) => {
                    if (index === action.index) {
                        return Object.assign({}, list, {
                            quantity: action.quantity
                        })
                    }
                    return list
                })
            });
        case LIST_ITEM_DECREMENT:
            return Object.assign({}, state, {
                lists: state.lists.map((list, index) => {
                    if (index === action.index) {
                        return Object.assign({}, list, {
                            quantity: action.quantity
                        })
                    }
                    return list
                })
            });

        default:
            return state;
    }
}


const rootReducer = combineReducers({
    products,
    lists,
    delivery,
    users
})

export default rootReducer