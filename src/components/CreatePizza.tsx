import { Dispatch, FormEvent, useReducer } from "react";
import { Pizza } from "../types/pizza.ts";
import { Ingredients } from "../types/ingredients.ts";
import { CartActions } from "../reducers/cart-reducer.ts";
import { calculatePrice } from "../utils/calculatePrice.ts";
import {
  createPizzaReduceer,
  initialCreatePizzaState,
} from "../reducers/createPizza-reducer.ts";

type CreatePizzaProps = {
  ingredients: Ingredients[];
  dispatch: Dispatch<CartActions>;
};
export default function CreatePizza({
  ingredients,
  dispatch,
}: CreatePizzaProps) {
  const [state, formDispatch] = useReducer(
    createPizzaReduceer,
    initialCreatePizzaState
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (state.selectedIngredients.length < 3) {
      alert("La pizza debe tener al menos 3 ingredientes.");
      return;
    }

    const defaultName = `Pizza de ${state.selectedIngredients
      .map((ing) => ing.name)
      .join(", ")}`;

    const newPizza: Pizza = {
      _id: crypto.randomUUID(),
      name: state.name || defaultName,
      mass: state.mass,
      size: state.size,
      dip: state.dip,
      ingredients: state.selectedIngredients,
      quantity: 1,
      price: calculatePrice(8, state.size, state.selectedIngredients, true),
      account: 1,
    };

    dispatch({ type: "add-to-cart", payload: { item: newPizza } });

    formDispatch({ type: "resetForm" });
  };

  const MAX_INGREDIENTS = 5;

  const handleIngredientChange = (ingredient: Ingredients) => {
    if (
      state.selectedIngredients.length >= MAX_INGREDIENTS &&
      !state.selectedIngredients.some((ing) => ing._id === ingredient._id)
    ) {
      alert(`No puedes seleccionar más de ${MAX_INGREDIENTS} ingredientes.`);
      return;
    }
    formDispatch({ type: "setSelectedIngredients", payload: ingredient });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200"
    >
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        Crea tu Pizza Personalizada
      </h2>

      <label className="block mb-4">
        <span className="text-gray-600 font-medium">Nombre de la pizza:</span>
        <input
          type="text"
          className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          value={state.name}
          onChange={(e) =>
            formDispatch({ type: "setName", payload: { name: e.target.value } })
          }
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-600 font-medium">Masa:</span>
        <select
          className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          value={state.mass}
          onChange={(e) =>
            formDispatch({
              type: "setSelectedMass",
              payload: { mass: e.target.value },
            })
          }
        >
          <option value="fina">Fina</option>
          <option value="normal">Normal</option>
        </select>
      </label>

      <label className="block mb-4">
        <span className="text-gray-600 font-medium">Tamaño:</span>
        <select
          className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          value={state.size}
          onChange={(e) =>
            formDispatch({
              type: "setSelectedSize",
              payload: { size: e.target.value },
            })
          }
        >
          <option value="pequeña">Pequeña</option>
          <option value="mediana">Mediana</option>
          <option value="familiar">Familiar</option>
        </select>
      </label>

      <label className="block mb-4">
        <span className="text-gray-600 font-medium">Salsa:</span>
        <select
          className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          value={state.dip}
          onChange={(e) =>
            formDispatch({
              type: "setSelectedDip",
              payload: { dip: e.target.value },
            })
          }
        >
          <option value="barbacoa">Barbacoa</option>
          <option value="carbonara">Carbonara</option>
          <option value="tomate">Tomate</option>
        </select>
      </label>

      <fieldset className="block mb-6">
        <legend className="text-gray-600 font-medium">Ingredientes:</legend>
        <div className="grid grid-cols-2 gap-4 mt-3">
          {ingredients.map((ingredient) => (
            <label key={ingredient._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-5 h-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400"
                value={ingredient._id}
                checked={state.selectedIngredients.some(
                  (ing) => ing._id === ingredient._id
                )}
                onChange={() => handleIngredientChange(ingredient)}
              />
              <span className="text-gray-700">{ingredient.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <p className="text-lg font-semibold text-center mb-6">
        Precio:{" "}
        <span className="text-yellow-500 font-bold">
          ${calculatePrice(8, state.size, state.selectedIngredients, true)}
        </span>
      </p>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
      >
        Añadir al Carrito
      </button>
    </form>
  );
}
