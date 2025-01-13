import { Ingredients } from "../types/ingredients";

export type CreatePizzaActions = 
    | { type: "setName"; payload: { name: string } }
    | { type: "setSelectedMass"; payload: { mass: string } }
    | { type: "setSelectedSize"; payload: { size: string } }
    | { type: "setSelectedDip"; payload: { dip: string } }
    | { type: "setSelectedIngredients"; payload: Ingredients }
    | { type: "resetForm"; }

export type CreatePizzaState = {
    name: string;
    mass: string;
    size: string;
    dip: string
    selectedIngredients: Ingredients[],
};

export const initialCreatePizzaState: CreatePizzaState = {
    name: "",
    mass: "normal",
    size: "pequeña",
    dip: "tomate",
    selectedIngredients: [],
  };
  

export const createPizzaReduceer = (
    state: CreatePizzaState = initialCreatePizzaState,
    action: CreatePizzaActions
): CreatePizzaState => {
    switch (action.type) {
        case "setName":
            return { ...state, name: action.payload.name }
        case "setSelectedMass":
            return { ...state, mass: action.payload.mass }
        case "setSelectedSize":
            return { ...state, size: action.payload.size }
        case "setSelectedDip":
            return { ...state, dip: action.payload.dip }
        case "setSelectedIngredients":
            const ingredientExists = state.selectedIngredients.some(
                (ing) => ing._id === action.payload._id
            );
            return { 
                ...state,
                selectedIngredients: ingredientExists
                ? state.selectedIngredients.filter((ing) => ing._id !== action.payload._id)
                : [ ...state.selectedIngredients, action.payload ], 
            };
        case "resetForm":
            return initialCreatePizzaState;
        default: 
            return state;
    }
};