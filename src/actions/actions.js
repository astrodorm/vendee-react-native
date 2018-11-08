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
export const TOGGLE_UPDATE_MODAL_PASSWORD_MANAGER = 'TOGGLE_UPDATE_MODAL_PASSWORD_MANAGER';
export const CHARGE_USER_STARTED = 'CHARGE_USER_STARTED';
export const CHARGE_USER_SUCCESS = 'CHARGE_USER_SUCCESS';
export const CHARGE_USER_FAILED = 'CHARGE_USER_FAILED';
export const UPDATE_USER_STARTED = 'UPDATE_USER_STARTED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const CHARGE_USER_PIN_STARTED = 'CHARGE_USER_PIN_STARTED';
export const CHARGE_USER_PIN_SUCCESS = 'CHARGE_USER_PIN_SUCCESS';
export const CHARGE_USER_PIN_FAILED = 'CHARGE_USER_PIN_FAILED';
export const CHARGE_USER_OTP_STARTED = 'CHARGE_USER_OTP_STARTED';
export const CHARGE_USER_OTP_SUCCESS = 'CHARGE_USER_OTP_SUCCESS';
export const CHARGE_USER_OTP_FAILED = 'CHARGE_USER_OTP_FAILED';
export const ADD_TO_CART_STARTED = 'ADD_TO_CART_STARTED';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILED = 'ADD_TO_CART_FAILED';
export const NEW_ADD_TO_CART_STARTED = 'NEW_ADD_TO_CART_STARTED';
export const NEW_ADD_TO_CART_SUCCESS = 'NEW_ADD_TO_CART_SUCCESS';
export const NEW_ADD_TO_CART_FAILED = 'NEW_ADD_TO_CART_FAILED';
export const CREATE_ORDER_STARTED = 'CREATE_ORDER_STARTED';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const SHOW_MODAL_PIN = 'SHOW_MODAL_PIN'



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


export const createOrderStartedAction = () => (
    {
        type: CREATE_ORDER_STARTED

    }
);

export const chargeUserStartedAction = () => (
    {
        type: CHARGE_USER_STARTED,

    }
);

export const chargeUserPinStartedAction = () => (
    {
        type: CHARGE_USER_PIN_STARTED,

    }
);

export const chargeUserOtpStartedAction = () => (
    {
        type: CHARGE_USER_OTP_STARTED,

    }
);


export const addToCartStartedAction = () => (
    {
        type: ADD_TO_CART_STARTED,
        // lengthOfOrder
    }
);


export const updateUserStartedAction = () => (
    {
        type: UPDATE_USER_STARTED,

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


// export const toggleUpdateModalPasswordManager = (visibility) => (
//     {
//         type: TOGGLE_UPDATE_MODAL_PASSWORD_MANAGER,
//         visibility
//     }
// );

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
        // payload: {
        //     ...data
        // }
        data
    }
);


export const fetchSuccessAction = (data) => (
    {
        type: FETCH_PRODUCT_SUCCESS,

        data
    }
);


export const createOrderSuccessAction = (data) => (
    {
        type: CREATE_ORDER_SUCCESS,

        data
    }
);


export const chargeUserSuccessAction = (data) => (
    {
        type: CHARGE_USER_SUCCESS,

        data
    }
);

export const chargeUserPinSuccessAction = (data) => (
    {
        type: CHARGE_USER_PIN_SUCCESS,

        data
    }
);


export const chargeUserOtpSuccessAction = (data) => (
    {
        type: CHARGE_USER_OTP_SUCCESS,

        data
    }
);



export const newAddToCartSuccessAction = (data) => (
    {
        type: NEW_ADD_TO_CART_SUCCESS,
        data
    }
);

export const showModalPin = (visibility) => (
    {
        type: SHOW_MODAL_PIN,
        visibility
    }
);

export const updateUserSuccessAction = (data) => (
    {
        type: UPDATE_USER_SUCCESS,
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


export const createOrderFailedAction = (error) => (
    {
        type: CREATE_ORDER_FAILED,
        // payload: {
        error
        // }
    }
);


export const chargeUserFailedAction = (error) => (
    {
        type: CHARGE_USER_FAILED,
        payload: {
            error
        }
    }
);


export const chargeUserPinFailedAction = (error) => (
    {
        type: CHARGE_USER_PIN_FAILED,
        payload: {
            error
        }
    }
);


export const chargeUserOtpFailedAction = (error) => (
    {
        type: CHARGE_USER_OTP_FAILED,
        payload: {
            error
        }
    }
);



export const newAddToCartFailedAction = (error) => (
    {
        type: NEW_ADD_TO_CART_FAILED,
        // payload: {
        //     error
        // }
        error
    }
);


export const updateUserFailedAction = (error) => (
    {
        type: UPDATE_USER_FAILED,
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
                dispatch(loginSuccessAction(res.data.data));
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



export const chargeUserAction = (userToken, amount, number, cvv, expiry_month, expiry_year) => {
    return dispatch => {
        dispatch(chargeUserStartedAction());

        let config = {
            headers: {
                'Authorization': 'Bearer ' + userToken
            }
        }

        axios
            .post(`${BASE_URL}/cards/charge`, {
                amount,
                number,
                cvv,
                expiry_month,
                expiry_year
            },
                config
            )
            .then(res => {
                dispatch(chargeUserSuccessAction(res.data));
            })
            // .then(()=>{
            //     dispatch(getState().chargeResponse.status === 200 ?
            //     withdrawMoney(42) :
            //     apologize('Me', 'The Sandwich Shop')
            //   )
            // })
            .catch(err => {
                dispatch(chargeUserFailedAction(err.response.data));
            });
    };
};



export const chargeUserPinAction = (userToken, reference, pin) => {
    return dispatch => {
        dispatch(chargeUserPinStartedAction());

        let config = {
            headers: {
                'Authorization': 'Bearer ' + userToken
            }
        }

        axios
            .post(`${BASE_URL}/cards/charge/pin`, {
                reference,
                pin,

            },
                config
            )
            .then(res => {
                dispatch(chargeUserPinSuccessAction(res.data));
            })
            .catch(err => {
                dispatch(chargeUserPinFailedAction(err.response.data));
            });
    };
};


export const chargeUserOtpAction = (userToken, reference, otp) => {
    return dispatch => {
        dispatch(chargeUserOtpStartedAction());

        let config = {
            headers: {
                'Authorization': 'Bearer ' + userToken
            }
        }

        axios
            .post(`${BASE_URL}/cards/charge/otp`, {
                reference,
                otp,

            },
                config
            )
            .then(res => {
                dispatch(chargeUserOtpSuccessAction(res.data));
            })
            .catch(err => {
                dispatch(chargeUserOtpFailedAction(err.response.data));
            });
    };
};



export const newAddToCartAction = (userToken, productID, quantity) => {
    return dispatch => {
        dispatch(addToCartStartedAction());

        let config = {
            headers: {
                'Authorization': 'Bearer ' + userToken
            }
        }

        axios
            .post(`${BASE_URL}/carts/add`, {
                productID,
                quantity,

            },
                config
            )
            .then(res => {
                dispatch(newAddToCartSuccessAction(res));
            })
            .catch(err => {
                dispatch(newAddToCartFailedAction(err));
            });
    };
};



export const addToCartAction = (userToken, productID, quantity) => {
    return dispatch => {
        dispatch(addToCartStartedAction());

        let config = {
            headers: {
                'Authorization': 'Bearer ' + userToken
            }
        }

        axios
            .post(`${BASE_URL}/carts/add`, {
                productID,
                quantity,

            },
                config
            )
            .then(res => {
                dispatch(addToCartSuccessAction(res));
                // dispatch(createOrderAction(userToken));
            })
            .catch(err => {
                dispatch(addToCartFailedAction(err));
            });
    };
};

export const promisedAddToCartAction = (userToken, productID, quantity) => (dispatch) =>
    new Promise(function (resolve, reject) {
        dispatch(addToCartStartedAction());


        let config = {
            headers: {
                'Authorization': 'Bearer ' + userToken
            }
        }


        axios
            .post(`${BASE_URL}/carts/add`, {
                productID,
                quantity,

            },
                config
            )
            .then(res => {
                dispatch(newAddToCartSuccessAction(res));
                // dispatch(createOrderAction(userToken));
                resolve(res);
            })
            .catch(err => {
                dispatch(newAddToCartFailedAction(err));
                reject(error);
            });

    });


export const createOrderAction = (userToken) => {
    return dispatch => {
        dispatch(createOrderStartedAction());

        console.log("createOrderAction > userToken")
        console.log(userToken)

        let config = {
            headers: {
                'Authorization': 'Bearer ' + userToken
            }
        }


        axios.get(`${BASE_URL}/orders/create`,
            config
        )
            .then(res => {
                dispatch(createOrderSuccessAction(res));
            })
            .catch(err => {
                dispatch(createOrderFailedAction(err));
            });

    };
};





export const addToCartAndCreateOrderAction = (userToken, productID, quantity) => {
    return (dispatch) => {
        dispatch(newAddToCartAction(userToken, productID, quantity));
        //.then((userToken) => {
        dispatch(createOrderAction(userToken));


        // });
    };
}




export const updateUserAction = (address, password) => {
    return dispatch => {
        dispatch(updateUserStartedAction());

        axios
            .put(`${BASE_URL}/customer/edit`, {
                address,
                password
            })
            .then(res => {
                dispatch(updateUserSuccessAction(res.data));
            })
            .catch(err => {
                dispatch(updateUserFailedAction(err.response.data));
            });
    };
};





