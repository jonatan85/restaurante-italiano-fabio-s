import { Ingredients } from './../types/ingredients';
import { CartItem, Pizza } from "../types/pizza";

export type CartActions =
  | { type: "add-to-cart"; payload: { item: Pizza } }
  | { type: "removeFromCart"; payload: { id: Pizza["_id"] } }
  | { type: "increaseAccount"; payload: { id: Pizza["_id"] } }
  | { type: "decreaseAccount"; payload: { id: Pizza["_id"] } }
  | { type: "clearCart" }
  | { type: "setPizzas"; payload: { pizzas: Pizza[] } }
  | { type: "setIngredients"; payload: { ingredients: Ingredients[] } };

export type CartState = {
  data: Pizza[];
  cart: CartItem[];
  ingredients: Ingredients[];
};

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

export const initialState: CartState = {
  data: [],
  cart: initialCart(),
  ingredients: []
};
const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === "add-to-cart") {
    const pizzaExits = state.cart.find(
      (pizza) => pizza._id === action.payload.item._id
    );
    let updateCart: CartItem[] = [];
    if (pizzaExits) {
      updateCart = state.cart.map((item) => {
        if (item._id === action.payload.item._id) {
          if (item.account < MAX_ITEMS) {
            return { ...item, account: item.account + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = { ...action.payload.item, account: 1 };
      updateCart = [...state.cart, newItem];
    }

    return {
      ...state,
      cart: updateCart,
    };
  }

  if (action.type === "removeFromCart") {
    const cart = state.cart.filter((pizza) => pizza._id !== action.payload.id);

    return {
      ...state,
      cart,
    };
  }

  if (action.type === "increaseAccount") {
    const cart = state.cart.map((item) => {
      if (item._id === action.payload.id && item.account < MAX_ITEMS) {
        return {
          ...item,
          account: item.account + 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart,
    };
  }

  if (action.type === "decreaseAccount") {
    const cart = state.cart.map((item) => {
      if (item._id === action.payload.id && item.account > MIN_ITEMS) {
        return {
          ...item,
          account: item.account - 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart,
    };
  }

  if (action.type === "clearCart") {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === "setPizzas") {
    return {
      ...state,
      data: action.payload.pizzas,
    };
  }

  if (action.type === 'setIngredients') {
    return {
      ...state,
      ingredients: action.payload.ingredients,
    };
  }

  return state;
};
