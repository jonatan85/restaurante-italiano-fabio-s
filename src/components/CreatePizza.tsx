import { Dispatch, FormEvent, useState } from "react";
import { Pizza, CartItem } from "../types/pizza.ts";
import { Ingredients } from "../types/ingredients.ts";
import { CartActions } from "../reducers/cart-reducer.ts";
import { calculatePrice } from "../utils/calculatePrice.ts";

const MASS_OPTIONS = ["fina", "normal"];
const SIZE_OPTIONS = ["pequeña", "mediana", "familiar"];
const DIP_OPTIONS = ["barbacoa", "carbonara", "tomate", "tomate", "napolitana"];

type CreatePizzaProps = {
  ingredients: Ingredients[],
  dispatch: Dispatch<CartActions>
};
export default function CreatePizza( { ingredients, dispatch } : CreatePizzaProps ) {
  const [ name, setName ] = useState("");
  const [ selectedMass, setSelectedMass ] = useState('normal');
  const [ selectedSize, setSelectedSize ] = useState('pequeña');
  const [ selectedDip, setSelectedDip ] = useState('tomate');
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredients[]>([]); 

  const handleSubmit = (e: FormEvent ) => {
    e.preventDefault();

    const defaultName =
    selectedIngredients.length > 0
      ? `Pizza de ${selectedIngredients.map((ing) => ing.name).join(", ")}`
      : "Pizza Personalizada";

    const newPizza: Pizza = {
      _id: crypto.randomUUID(),
      name: name || defaultName,
      mass: selectedMass,
      size: selectedSize,
      dip: selectedDip,
      ingredients: selectedIngredients,
      quantity: 1,
      price: calculatePrice( 8, selectedSize, selectedIngredients, true ),
      account: 1,
    };

    dispatch({ type: "add-to-cart", payload: { item: newPizza } });

    setName('');
    setSelectedMass('normal');
    setSelectedSize('pequeña');
    setSelectedDip('tomate');
    setSelectedIngredients([]);

    
  };

  const MAX_INGREDIENTS = 5;

  const handleIngredientChange = (ingredient: Ingredients) => {
    setSelectedIngredients((prev) => {
      if( prev.some((ing) => ing._id === ingredient._id)) {
        return prev.filter((ing) => ing._id !== ingredient._id)
      }
      
      if( prev.length >= MAX_INGREDIENTS) {
        alert(`No puedes seleccionar más de ${MAX_INGREDIENTS} ingredientes.`)
        return prev;
      }

      return [...prev, ingredient];
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-center mb-4">Crea tu Pizza Personalizada</h2>

    {/* Campo para el nombre de la pizza */}
    <label className="block mb-2">
      <span className="text-gray-700">Nombre de la pizza:</span>
      <input
        type="text"
        className="block w-full mt-1 border-gray-300 rounded-md"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </label>

    {/* Selector de masa */}
    <label className="block mb-2">
      <span className="text-gray-700">Masa:</span>
      <select
        className="block w-full mt-1 border-gray-300 rounded-md"
        value={selectedMass}
        onChange={(e) => setSelectedMass(e.target.value)}
      >
        <option value="fina">Fina</option>
        <option value="normal">Normal</option>
      </select>
    </label>

    {/* Selector de tamaño */}
    <label className="block mb-2">
      <span className="text-gray-700">Tamaño:</span>
      <select
        className="block w-full mt-1 border-gray-300 rounded-md"
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
      >
        <option value="pequeña">Pequeña</option>
        <option value="mediana">Mediana</option>
        <option value="familiar">Familiar</option>
      </select>
    </label>

    {/* Selector de salsa */}
    <label className="block mb-2">
      <span className="text-gray-700">Salsa:</span>
      <select
        className="block w-full mt-1 border-gray-300 rounded-md"
        value={selectedDip}
        onChange={(e) => setSelectedDip(e.target.value)}
      >
        <option value="barbacoa">Barbacoa</option>
        <option value="carbonara">Carbonara</option>
        <option value="tomate">Tomate</option>
      </select>
    </label>

    {/* Lista de ingredientes */}
    <fieldset className="block mb-4">
      <legend className="text-gray-700 font-medium">Ingredientes:</legend>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {ingredients.map((ingredient) => (
          <label key={ingredient._id} className="flex items-center">
            <input
              type="checkbox"
              value={ingredient._id}
              checked={selectedIngredients.some((ing) => ing._id === ingredient._id)}
              onChange={() => handleIngredientChange(ingredient)}
            />
            <span className="ml-2">{ingredient.name}</span>
          </label>
        ))}
      </div>
    </fieldset>

    {/* Muestra el precio calculado */}
    <p className="text-lg font-bold text-center mb-4">
      Precio: ${calculatePrice(8, selectedSize, selectedIngredients, true)}
    </p>

    {/* Botón para añadir la pizza al carrito */}
    <button
      type="submit"
      className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900"
    >
      Añadir al Carrito
    </button>
  </form>
  );
}
