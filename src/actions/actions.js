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


export const addItemAction = (id) => (
    {
        type: ITEM_ADD,
        id
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
