import { Dispatch, useState } from "react";
import type { Pizza } from "../types/pizza";
import { CartActions } from "../reducers/cart-reducer";
import { calculatePrice } from "../utils/calculatePrice";

type PizzaProps = {
  pizza: Pizza;
  dispatch: Dispatch<CartActions>;
};

export default function Pizzas({ pizza, dispatch }: PizzaProps) {
  const { price, ingredients } = pizza;

  const [selectedMass, setSelectedMass] = useState("normal");
  const [selectedSize, setSelectedSize] = useState("pequeño");
  const [selectedDip, setSelectedDip] = useState("tomate");

  const handleAddToCart = () => {
    const customizedPizza = {
      ...pizza,
      mass: selectedMass,
      size: selectedSize,
      dip: selectedDip,
      price: calculatePrice(price, selectedSize),
    };
    dispatch({
      type: "add-to-cart",
      payload: { item: customizedPizza },
    });
  };
  return (
    <div className="flex flex-col sm:flex-row bg-gray-100 rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="w-full sm:w-1/2">
        <img
          className="rounded-lg object-cover w-full h-64 sm:h-full"
          src={pizza.picture}
          alt={`Imagen de la pizza ${pizza.name}`}
        />
      </div>

      <div className="w-full sm:w-1/2 sm:pl-8 mt-6 sm:mt-0 flex flex-col justify-between">
        <h3 className="text-black text-2xl font-bold uppercase mb-4 text-center sm:text-left">
          {pizza.name}
        </h3>
        
        <ul className="text-gray-700 mb-4">
          {ingredients?.map((ingredient, index) => (
            <li key={ingredient._id} className="flex items-center gap-2">
              <span>🍕</span> {ingredient.name}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4">
          <label>
            <span className="text-gray-600 font-medium">Masa:</span>
            <select
              className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={selectedMass}
              onChange={(e) => setSelectedMass(e.target.value)}
            >
              <option value="fina">Fina</option>
              <option value="normal">Normal</option>
            </select>
          </label>

          <label>
            <span className="text-gray-600 font-medium">Tamaño:</span>
            <select
              className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="pequeña">Pequeña</option>
              <option value="mediana">Mediana</option>
              <option value="familiar">Familiar</option>
            </select>
          </label>
        </div>

        <p className="text-yellow-500 font-extrabold text-xl mt-6 text-center sm:text-left">
          ${calculatePrice(pizza.price, selectedSize)}
        </p>

        <button
          type="button"
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg w-full py-3 mt-4 font-bold text-lg shadow-md hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
          onClick={handleAddToCart}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
