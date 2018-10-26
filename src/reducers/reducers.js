import { combineReducers } from 'redux';
import { ITEM_INCREMENT, ITEM_DECEREMENT, ITEM_ADD, ITEM_SELECT, LIST_ITEM_INCREMENT, LIST_ITEM_DECREMENT, ITEM_REMOVE } from '../actions/actions';

const initialState = {
    count: 149,
    products: [{ id: 1, thumbnail: "http://oja.ng/wp-content/uploads/2018/05/nasco-corn-flakes-350g.jpg", title: "Nasco Cornflakes 50g", price: "1,234" }, { id: 2, thumbnail: "http://images.kglobalservices.com/www.kelloggs.com.au/en_au/product/product_449/prod_img-198128_corn-flakes-4.png", title: "Kellogs Cornflakes 70g", price: "9,870" }],
    lists: [{ id: 1, quantity: 5 }],
    selectProductID: 0,
    selectProductQuantity: 0,
    //isVisibleFBtnShoppingList: false,
}


//../../assets/images/nasco-corn-flakes-350g.png

function products(state = initialState, action) {
    switch (action.type) {
        case ITEM_INCREMENT:
            return Object.assign({}, state, {
                selectProductQuantity: state.selectProductQuantity + 1
                //count: state.count + 1
            });

        case ITEM_DECEREMENT:
            return Object.assign({}, state, {
                selectProductQuantity: state.selectProductQuantity - 1
                //count: state.count + 1
            });
        case ITEM_SELECT:
            return Object.assign({}, state, {
                selectProductID: action.id,
                selectProductQuantity: action.quantity
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
                // items: [
                //     ...state.items.slice(0, action.payload),
                //     ...state.items.slice(action.payload + 1)
                // ],
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
    lists
})

export default rootReducer