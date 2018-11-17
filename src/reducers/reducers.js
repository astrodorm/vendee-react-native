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
    LOGIN_USER_FAILED,
    FETCH_PRODUCT_STARTED,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILED,
    LIST_TOTAL,
    LIST_CONVENIENCE_FEE,
    LIST_GRAND_TOTAL,
    TOGGLE_ADD_MODAL_ADDRESS_MANAGER,
    TOGGLE_ADD_MODAL_TELEPHONE_MANAGER,
    TOGGLE_ADD_MODAL_CARD_MANAGER,
    TOGGLE_UPDATE_MODAL_PASSWORD_MANAGER,
    CHARGE_USER_STARTED,
    CHARGE_USER_FAILED,
    CHARGE_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_STARTED,
    UPDATE_USER_FAILED,
    CHARGE_USER_PIN_STARTED,
    CHARGE_USER_PIN_SUCCESS,
    CHARGE_USER_PIN_FAILED,
    CHARGE_USER_OTP_STARTED,
    CHARGE_USER_OTP_SUCCESS,
    CHARGE_USER_OTP_FAILED,
    ADD_TO_CART_STARTED,
    ADD_TO_CART_FAILED,
    ADD_TO_CART_SUCCESS,
    NEW_ADD_TO_CART_STARTED,
    NEW_ADD_TO_CART_FAILED,
    NEW_ADD_TO_CART_SUCCESS,
    CREATE_ORDER_STARTED,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_SUCCESS,
    SHOW_MODAL_PIN,
    FETCH_LIST_STARTED,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_FAILED,
    FIRST_FETCH_PRODUCT_STARTED
} from '../actions/actions';

const initialState = {
    // count: 149,
    products: [{ id: 1, thumbnail: "http://oja.ng/wp-content/uploads/2018/05/nasco-corn-flakes-350g.jpg", title: "Nasco Cornflakes 50g", price: 1234 }, { id: 2, thumbnail: "http://images.kglobalservices.com/www.kelloggs.com.au/en_au/product/product_449/prod_img-198128_corn-flakes-4.png", title: "Kellogs Cornflakes 70g", price: 9870 }],
    lists: [{ id: 1, quantity: 5 }],
    newproducts: [],
    newlists: [],
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
    responseMessage: "",
    updateUserResponseStatus: 0,
    updateUserResponseMessage: "",
    isFirstSearch: false,
    listTotal: "",
    convenienceFee: "",
    grandTotal: "",
    isVisibleAddAddressManager: false,
    isVisibleAddTelephoneManager: false,
    isVisibleAddCardManager: false,
    isVisibleAddPasswordManager: false,
    isChargingUser: false,
    isChargingUserError: false,
    isChargingPinUser: false,
    isChargingUserPinError: false,
    isChargingUserPinSuccess: false,
    chargeResponse: [],
    addToCartResponse: [],
    isUpdatingUser: false,
    isUpdatingUserError: false,
    isUpdatingUserSuccess: false,
    isAddingToCart: false,
    isAddToCartError: false,
    isCreatingOrder: false,
    isCreateOrderError: false,
    createOrderResponse: [],
    showModalpin: false,
    orderCount: 0,
    isFetchingList: false,
    isFetchListError: false,
    isFetchListSuccess: false,
    fetchListResponse: [],
    shoppingList: [],
    deliveryFee: 0
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
        case FETCH_PRODUCT_STARTED:
            return Object.assign({}, state, {
                searchText: action.query,
                isLoadingSearchBar: true,
            });
        case FIRST_FETCH_PRODUCT_STARTED:
            return Object.assign({}, state, {
                isFirstSearch: action.isFirst
            });
        case FETCH_PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                isLoadingSearchBar: false,
                newproducts: [...action.data],
            });
        case FETCH_PRODUCT_FAILED:
            return Object.assign({}, state, {
                isLoadingSearchBar: false,
                responseStatus: action.payload.error.status,
                responseMessage: action.payload.error.message
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
        case CHARGE_USER_STARTED:
            return Object.assign({}, state, {
                isChargingUser: true,
                isChargingUserError: false,
            });
        case CHARGE_USER_OTP_STARTED:
            return Object.assign({}, state, {
                isChargingUser: true,
                isChargingUserError: false,
            });
        case CHARGE_USER_PIN_STARTED:
            return Object.assign({}, state, {
                isChargingPinUser: true,
                isChargingUserPinError: false,
            });
        case UPDATE_USER_STARTED:
            return Object.assign({}, state, {
                isUpdatingUser: true,
                isUpdatingUserError: false
            });
        case CHARGE_USER_SUCCESS:
            return Object.assign({}, state, {
                isChargingUser: false,
                chargeResponse: action.data,
            });
        case CHARGE_USER_PIN_SUCCESS:
            return Object.assign({}, state, {
                isChargingPinUser: false,
                chargeResponse: action.data,
            });
        case CHARGE_USER_OTP_SUCCESS:
            return Object.assign({}, state, {
                isChargingPinUser: false,
                chargeResponse: action.data,
            });
        case CHARGE_USER_FAILED:
            return Object.assign({}, state, {
                isChargingUser: false,
                chargeResponse: action.payload,
            });
        case CHARGE_USER_PIN_FAILED:
            return Object.assign({}, state, {
                isChargingPinUser: false,
                chargeResponse: action.payload,
            });
        case CHARGE_USER_OTP_FAILED:
            return Object.assign({}, state, {
                isChargingPinUser: false,
                chargeResponse: action.payload,
            });
        case TOGGLE_ADD_MODAL_ADDRESS_MANAGER:
            return Object.assign({}, state, {
                isVisibleAddAddressManager: action.visibility
            });
        case TOGGLE_ADD_MODAL_TELEPHONE_MANAGER:
            return Object.assign({}, state, {
                isVisibleAddTelephoneManager: action.visibility
            });
        case TOGGLE_ADD_MODAL_CARD_MANAGER:
            return Object.assign({}, state, {
                isVisibleAddCardManager: action.visibility
            });
        case TOGGLE_UPDATE_MODAL_PASSWORD_MANAGER:
            return Object.assign({}, state, {
                isVisibleAddPasswordManager: action.visibility
            });
        case CREATE_USER_SUCCESS:
            return Object.assign({}, state, {
                isCreatingUser: false,
                error: null,
                isCreateUserError: false,
                isCreateUserSuccess: true,
                user: action.data
            });
        case UPDATE_USER_SUCCESS:
            return Object.assign({}, state, {
                isUpdatingUser: true,
                error: null,
                isUpdatingUserError: false,
                isUpdatingUserSuccess: true,
                // user: action.data
            });
        case LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                isSigningInUser: false,
                error: null,
                isLoginUserError: false,
                isLoginUserSuccess: true,
                user: action.data
            });
        case CREATE_USER_FAILED:
            return Object.assign({}, state, {
                isCreatingUser: false,
                isCreateUserError: true,
                isCreateUserSuccess: false,
                responseStatus: action.payload.error.status,
                responseMessage: action.payload.error.message
            });
        case UPDATE_USER_FAILED:
            return Object.assign({}, state, {
                isUpdatingUser: false,
                isUpdatingUserError: true,
                isUpdatingUserSuccess: false,
                updateUserResponseStatus: action.payload,
                updateUserResponseMessage: action.payload
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
                isPickup: action.isPickup,
                deliveryFee: action.fee
            });
        default:
            return state;
    }
}





function lists(state = initialState, action) {
    switch (action.type) {
        case ITEM_ADD:
            return Object.assign({}, state, {
                newlists: [
                    ...state.newlists,
                    {
                        id: action.id,
                        thumbnail: action.thumbnail,
                        title: action.title,
                        price: action.price,
                        quantity: 1,
                    }
                ]
            });
        case LIST_TOTAL:
            return Object.assign({}, state, {
                listTotal: action.total,
            });
        case ADD_TO_CART_STARTED:
            return Object.assign({}, state, {
                isAddingToCart: true,
                isAddToCartError: false,
                orderCount: state.orderCount + 1
            });
        case CREATE_ORDER_STARTED:
            return Object.assign({}, state, {
                isCreatingOrder: true,
                isCreateOrderError: false
            });
        case FETCH_LIST_STARTED:
            return Object.assign({}, state, {
                isFetchingList: true,
                isFetchListError: false
            });
        case SHOW_MODAL_PIN:
            return Object.assign({}, state, {
                showModalpin: action.visibility,
            });
        case NEW_ADD_TO_CART_SUCCESS:
            return Object.assign({}, state, {
                isAddingToCart: false,
                addToCartResponse: action.data,
            });
        case CREATE_ORDER_SUCCESS:
            return Object.assign({}, state, {
                isCreatingOrder: false,
                createOrderResponse: action.data,
            });
        case FETCH_LIST_SUCCESS:
            return Object.assign({}, state, {
                isFetchingList: false,
                fetchListResponse: action.data,
                shoppingList: [...action.data.data.data]
            });
        case NEW_ADD_TO_CART_FAILED:
            return Object.assign({}, state, {
                isAddingToCart: false,
                isAddToCartError: true,
                isAddToCartSuccess: false,
                addToCartResponse: action.error,
            });
        case CREATE_ORDER_FAILED:
            return Object.assign({}, state, {
                isCreatingOrder: false,
                isCreateOrderError: true,
                isCreateOrderSuccess: true,
                createOrderResponse: action.error,
            });
        case FETCH_LIST_FAILED:
            return Object.assign({}, state, {
                isFetchingList: false,
                isFetchListError: true,
                isFetchListSuccess: true,
                fetchListResponse: action.error,
            });
        case LIST_CONVENIENCE_FEE:
            return Object.assign({}, state, {
                convenienceFee: action.convenienceFee,
            });
        case LIST_GRAND_TOTAL:
            return Object.assign({}, state, {
                grandTotal: action.grandTotal,
            });
        case ITEM_REMOVE:
            return Object.assign({}, state, {
                newlists: [
                    ...state.newlists.slice(0, action.index),
                    ...state.newlists.slice(action.index + 1)
                ]
            });
        case LIST_ITEM_INCREMENT:
            return Object.assign({}, state, {
                newlists: state.newlists.map((newlist, index) => {
                    if (index === action.index) {
                        return Object.assign({}, newlist, {
                            quantity: action.quantity
                        })
                    }
                    return newlist
                })
            });
        case LIST_ITEM_DECREMENT:
            return Object.assign({}, state, {
                newlists: state.newlists.map((newlist, index) => {
                    if (index === action.index) {
                        return Object.assign({}, newlist, {
                            quantity: action.quantity
                        })
                    }
                    return newlist
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