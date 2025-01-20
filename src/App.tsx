import { useEffect, useReducer, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { cartReducer, initialState } from "./reducers/cart-reducer.ts";

import { getPizzas } from "./service/pizzaService.ts";
import { getIngredients } from "./service/ingredientsService.ts";

import CreatePizza from "./components/CreatePizza.tsx";
import Pizzas from "./components/Pizzas.tsx";
import Header from "./components/Header.tsx";
import BackOffice from "./components/BackOffice.tsx";

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
        dispatch({
          type: "setIngredients",
          payload: { ingredients: dataIngredients },
        });
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
        <Routes>
          <Route
            path="/"
            element={
              <div>
              <h2 className="text-center text-3xl font-bold text-gray-800">
                ¡Elige tu Pizza Favorita!
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {state.data.map((pizza) => (
                  <Pizzas key={pizza._id} pizza={pizza} dispatch={dispatch} />
                ))}
              </div>
            </div>
            
            }
          />

          <Route
            path="/crear-pizza"
            element={
              <CreatePizza
                ingredients={state.ingredients}
                dispatch={dispatch}
              />
            }
          />

          <Route
            path="/back-office"
            element={
              <BackOffice
                cart={state.cart}
                dispatch={dispatch}
              />
            }
          />
        </Routes>
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
