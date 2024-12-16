import type { Pizza } from "../types/pizza";

type PizzaProps = {
  pizza: Pizza,
  addToCart: (item: Pizza) => void
}

export default function Pizzas( { pizza, addToCart } : PizzaProps) {

  const { _id, dip, ingredients, mass, name, picture, price, size } = pizza;

 

  return (
    <div className="flex flex-wrap items-center bg-gray-100 rounded-lg shadow-md p-4 my-4">
      <div className="w-1/3">
        <img className="rounded-lg object-cover w-full" src={picture} alt="imagen pizza" />
      </div>
      <div className="w-2/3 pl-4">
        <h3 className="text-black text-xl font-bold uppercase">{name}</h3>
        <p className="text-gray-600 text-sm mt-2">{dip}</p>
        <p className="text-gray-600 text-sm mt-2">{ingredients}</p>
        <p className="text-gray-600 text-sm mt-2">{mass}</p>
        <p className="text-gray-600 text-sm mt-2">{size}</p>
        <p className="text-primary font-extrabold text-lg mt-2">${price}</p>
        <button
          type="button"
          className="bg-gray-800 text-white rounded-md w-full py-2 mt-4 hover:bg-gray-900"
          onClick={() => addToCart(pizza)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
