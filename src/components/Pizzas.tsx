import { Dispatch, useState } from "react";
import type { Pizza } from "../types/pizza";
import { CartActions } from "../reducers/cart-reducer";
import Ingredients from "./Ingredients";

type PizzaProps = {
  pizza: Pizza;
  dispatch: Dispatch<CartActions>;
};

export default function Pizzas({ pizza, dispatch }: PizzaProps) {
  const { name, picture, dip, ingredients, mass, size, price } = pizza;

  const [selectedMass, setSelectedMass] = useState("normal");
  const [selectedSize, setSelectedSize] = useState("pequeño");
  const [selectedDip, setSelectedDip] = useState("tomate");

  const calculatePrice = () => {
    let adjustedPrice = price;
    if (selectedSize === "mediana") {
      adjustedPrice += price * 0.2;
    } else if (selectedSize === "familiar") {
      adjustedPrice += price * 0.4;
    }
    return adjustedPrice.toFixed(2);
  };

  const handleAddToCart = () => {
    const customizedPizza = {
      ...pizza,
      mass: selectedMass,
      size: selectedSize,
      dip: selectedDip,
      price: parseFloat(calculatePrice()),
    };
    dispatch({
      type: "add-to-cart",
      payload: { item: customizedPizza },
    });
  };
  return (
    <div className="flex flex-wrap items-center bg-gray-100 rounded-lg shadow-md p-4 my-4">
      <div className="w-1/3">
        <img
          className="rounded-lg object-cover w-full"
          src={picture}
          alt={`Imagen de la pizza ${name}`}
        />
      </div>
      <div className="w-2/3 pl-4">
        <h3 className="text-black text-xl font-bold uppercase">{name}</h3>
        <Ingredients
          ingredients={ingredients}
        />

        <label className="block mt-2">
          <span className="text-gray-700 text-sm">Masa:</span>
          <select
            className="block w-full mt-1 border-gray-300 rounded-md"
            value={selectedMass}
            onChange={(e) => setSelectedMass(e.target.value)}
          >
            <option value="fina">Fina</option>
            <option value="normal">Normal</option>
          </select>
        </label>

        <label className="block mt-2">
          <span className="text-gray-700 text-sm">Tamaño:</span>
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

        <label className="block mt-2">
          <span className="text-gray-700 text-sm">Salsa:</span>
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

        <p className="text-primary font-extrabold text-lg mt-2">
          ${calculatePrice()}
        </p>

        <button
          type="button"
          className="bg-gray-800 text-white rounded-md w-full py-2 mt-4 hover:bg-gray-900"
          onClick={handleAddToCart}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
