import { CartItem, Pizza } from "../types/pizza";

export type CartActions = 
    { type: 'add-to-cart', payload: {item: Pizza} } |
    { type: 'removeFromCart', payload: {id: Pizza['_id']} } |
    { type: 'increaseAccount', payload: {id: Pizza['_id']} } | 
    { type: 'decreaseAccount', payload: {_id: Pizza['_id']} } | 
    { type: 'clearCart' }  
    // { type: '', payload: {} } | 

export type CartState = {
    cart: CartItem[]
};

export const initialState : CartState = {
    cart: []
};

export const cartReducer = (
    state: CartState = initialState,
    action: CartActions 
) => {

}