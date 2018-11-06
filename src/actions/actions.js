import axios from 'axios'



//
// ACTIONS
//
export const ITEM_INCREMENT = 'ITEM_INCREMENT';
export const ITEM_DECEREMENT = 'ITEM_DECEREMENT';
export const ITEM_ADD = 'ITEM_ADD';
export const ITEM_REMOVE = 'ITEM_REMOVE';
export const ITEM_SELECT = 'ITEM_SELECT';
export const LIST_ITEM_INCREMENT = 'LIST_ITEM_INCREMENT';
export const LIST_ITEM_DECREMENT = 'LIST_ITEM_DECREMENT';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const END_FETCH_PRODUCT = 'END_FETCH_PRODUCT';
export const DELIVERY_METHOD = 'DELIVERY_METHOD';
export const CREATE_USER_STARTED = 'CREATE_USER_STARTED';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';
export const LOGIN_USER_STARTED = 'LOGIN_USER_STARTED';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
export const FETCH_PRODUCT_STARTED = 'FETCH_PRODUCT_STARTED';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILED = 'FETCH_PRODUCT_FAILED';
export const LIST_TOTAL = 'LIST_TOTAL';
export const LIST_CONVENIENCE_FEE = 'LIST_CONVENIENCE_FEE';
export const LIST_GRAND_TOTAL = 'LIST_GRAND_TOTAL';
export const TOGGLE_ADD_MODAL_ADDRESS_MANAGER = 'TOGGLE_ADD_MODAL_ADDRESS_MANAGER';
export const TOGGLE_ADD_MODAL_TELEPHONE_MANAGER = 'TOGGLE_ADD_MODAL_TELEPHONE_MANAGER';
export const TOGGLE_ADD_MODAL_CARD_MANAGER = 'TOGGLE_ADD_MODAL_CARD_MANAGER';



const BASE_URL = "https://api.yourvendee.com/api";


//
//ACTION CREATORS
//
export const itemIncrementAction = () => (
    {
        type: ITEM_INCREMENT,
    }
);


export const itemDecrementAction = () => (
    {
        type: ITEM_DECEREMENT
    }
);


export const addItemAction = (id, thumbnail, title, price) => (
    {
        type: ITEM_ADD,
        id,
        thumbnail,
        title,
        price
    }
);


export const removeItemAction = (index) => (
    {
        type: ITEM_REMOVE,
        index
    }
);


export const itemSelectAction = (id, quantity) => (
    {
        type: ITEM_SELECT,
        id,
        quantity
    }
);


export const incrementListItemAction = (index, quantity) => (
    {
        type: LIST_ITEM_INCREMENT,
        index,
        quantity
    }
);


export const decrementListItemAction = (index, quantity) => (
    {
        type: LIST_ITEM_DECREMENT,
        index,
        quantity
    }
);


export const endfetchProductAction = () => (
    {
        type: END_FETCH_PRODUCT
    }
);

export const selectDeliveryMethod = (isDelivery, isPickup) => (
    {
        type: DELIVERY_METHOD,
        isDelivery,
        isPickup
    }
);

// export const signUpUser = () =>{

// }

export const createUserStartedAction = () => (
    {
        type: CREATE_USER_STARTED
    }
);

export const loginStartedAction = () => (
    {
        type: LOGIN_USER_STARTED
    }
);

export const fetchStartedAction = (query) => (
    {
        type: FETCH_PRODUCT_STARTED,
        query
    }
);

export const updateTotalAction = (total) => (
    {
        type: LIST_TOTAL,
        total
    }
);

export const updateConvenienceFeeAction = (convenienceFee) => (
    {
        type: LIST_CONVENIENCE_FEE,
        convenienceFee
    }
);

export const updateGrandTotalAction = (grandTotal) => (
    {
        type: LIST_GRAND_TOTAL,
        grandTotal
    }
);

export const toggleAddModalAddressManager = (visibility) => (
    {
        type: TOGGLE_ADD_MODAL_ADDRESS_MANAGER,
        visibility
    }
);

export const toggleAddModalTelephoneManager = (visibility) => (
    {
        type: TOGGLE_ADD_MODAL_TELEPHONE_MANAGER,
        visibility
    }
);

export const toggleUpdateModalPasswordManager = (visibility) => (
    {
        type: TOGGLE_UPDATE_MODAL_PASSWORD_MANAGER,
        visibility
    }
);

export const toggleAddModalCardManager = (visibility) => (
    {
        type: TOGGLE_ADD_MODAL_CARD_MANAGER,
        visibility
    }
);

export const createUserSuccessAction = (data) => (
    {
        type: CREATE_USER_SUCCESS,
        payload: {
            ...data
        }
    }
);


export const loginSuccessAction = (data) => (
    {
        type: LOGIN_USER_SUCCESS,
        payload: {
            ...data
        }
    }
);


export const fetchSuccessAction = (data) => (
    {
        type: FETCH_PRODUCT_SUCCESS,
        // payload: {
        //    // ...data,
        //     ...data.data
        // }
        data
    }
);


// export const fetchSuccessAction = (data) => (
//     {
//         type: FETCH_PRODUCT_SUCCESS,
//         data
//     }
// );

export const createUserFailedAction = (error) => (
    {
        type: CREATE_USER_FAILED,
        payload: {
            error
        }
    }
);


export const loginFailedAction = (error) => (
    {
        type: LOGIN_USER_FAILED,
        payload: {
            error
        }
    }
);

export const fetchFailedAction = (error) => (
    {
        type: FETCH_PRODUCT_FAILED,
        payload: {
            error
        }
    }
);


export const createUserAction = (firstname, lastname, phoneNumber, email, oauth) => {
    return dispatch => {
        dispatch(createUserStartedAction());

        axios
            .post(`${BASE_URL}/customers`, {
                firstname,
                lastname,
                phoneNumber,
                email,
                oauth
            })
            .then(res => {
                dispatch(createUserSuccessAction(res.data));
            })
            .catch(err => {
                dispatch(createUserFailedAction(err.response.data));
            });
    };
};


export const loginAction = (email, oauth) => {
    return dispatch => {
        dispatch(loginStartedAction());

        axios
            .post(`${BASE_URL}/customers/login`, {
                email,
                oauth
            })
            .then(res => {
                dispatch(loginSuccessAction(res.data));
            })
            .catch(err => {
                dispatch(loginFailedAction(err.response.data));
            });
    };
};


export const fetchProductAction = (query) => {
    return dispatch => {
        dispatch(fetchStartedAction(query));

        axios.get(`${BASE_URL}/products/search`, {
            params: {
                q: query
            }
        })
            .then(res => {
                dispatch(fetchSuccessAction(res.data.data));
            })
            .catch(err => {
                dispatch(fetchFailedAction(err.response.data));
            });

    };
};


// export const fetchProductAction = (text) => (
//     {
//         type: FETCH_PRODUCT,
//         text
//     }
// );


