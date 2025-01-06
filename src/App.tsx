import { useEffect, useReducer, useState } from "react";
import Header from "./components/Header.tsx";
import Pizzas from "./components/Pizzas.tsx";
import { getPizzas } from "./service/pizzaService.ts";
import { Pizza } from "./types/pizza.ts";

import { cartReducer, initialState } from "./reducers/cart-reducer.ts";

function App() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const dataPizzas = await getPizzas();
        setPizzas(dataPizzas);
      } catch (err) {
        setError("Error al cargar las pizzas");
        console.error(err);
      }
    };
    fetchPizzas();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <Header cart={state.cart} dispatch={dispatch} />
      <main className="container mx-auto mt-10 px-4">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          ¡Elige tu Pizza Favorita!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {pizzas.map((pizza) => (
            <Pizzas key={pizza._id} pizza={pizza} dispatch={dispatch} />
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 mt-10 py-8">
        <div className="container mx-auto text-center">
          <p className="text-white text-lg">
            Favio´s - Todos los derechos reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
