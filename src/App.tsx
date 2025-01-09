import { useEffect, useReducer, useState } from "react";
import Header from "./components/Header.tsx";
import Pizzas from "./components/Pizzas.tsx";
import { getPizzas } from "./service/pizzaService.ts";


import { cartReducer, initialState } from "./reducers/cart-reducer.ts";
import { getIngredients } from "./service/ingredientsService.ts";

function App() {
  
  const [error, setError] = useState<string | null>(null);
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const dataPizzas = await getPizzas();
        dispatch({ type: "setPizzas", payload: { pizzas: dataPizzas } });
      } catch (err) {
        setError("Error al cargar las Pizzas");
        console.error(err);
      }
    };
    fetchPizzas();
  }, []);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const dataIngredients = await getIngredients();
        dispatch({ type: "setIngredients", payload: { ingredients: dataIngredients } });
      } catch (err) {
        setError("Error al cargar los Ingredientes");
        console.error(err);
      }
    };
    fetchIngredients();
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
          {state.data.map((pizza) => (
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
