//
// ACTIONS
//
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';



//
//ACTION CREATORS
//
export const incrementQuantity = () => (
    {
        type: INCREMENT_QUANTITY
    }
);


export const decrementQuantity = () => (
    {
        type: DECREMENT_QUANTITY
    }
);

