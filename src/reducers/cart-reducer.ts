import { CartItem, Pizza } from "../types/pizza";

export type CartActions = 
    { type: 'add-to-cart', payload: {item: Pizza} } |
    { type: 'removeFromCart', payload: {id: Pizza['_id']} } |
    { type: 'increaseAccount', payload: {id: Pizza['_id']} } | 
    { type: 'decreaseAccount', payload: {_id: Pizza['_id']} } | 
    { type: 'clearCart' } |
    { type: 'setPizzas', payload: { pizzas: Pizza[] }}  

export type CartState = {
    data: Pizza[]
    cart: CartItem[]
};

const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState : CartState = {
    data: [],
    cart: initialCart()
};
const MIN_ITEMS = 1
const MAX_ITEMS = 5
export const cartReducer = (
    state: CartState = initialState,
    action: CartActions 
) => {

    if(action.type === 'add-to-cart') {
        const pizzaExits = state.cart.find((pizza) => pizza._id === action.payload.item._id);
        let updateCart : CartItem[] = [];
        if(pizzaExits) {
            updateCart = state.cart.map(item => {
                if (item._id === action.payload.item._id) {
                    if (item.account < MAX_ITEMS) {
                        return { ...item, account: item.account + 1 };
                    } else {
                        return item;
                    }
                } else {
                    return item;
                }
            })
        } else {
            const newItem : CartItem = {...action.payload.item, account : 1}
            updateCart = [ ...state.cart, newItem ]
        }
        
        return {
            ...state,
            cart: updateCart
        }
    }

    if(action.type === 'setPizzas') {
        return {
            ...state,
            data: action.payload.pizzas
        }
    }

    return state
}