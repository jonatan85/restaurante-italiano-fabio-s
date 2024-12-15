import { useEffect, useState } from "react";
import Header from "./components/Header.tsx";
import Pizzas from "./components/Pizzas.tsx";
import { getPizzas } from "./service/pizzaService.ts";
import { Pizza } from "./types/pizza.ts";

function App() {
  // Consultar la base de datos porvisional.
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Pizza[]>([])

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

  function addToCart(item: Pizza) {
    const pizzaExists = cart.findIndex((pizza) => pizza._id === item._id);
    if(pizzaExists >= 0 ) {
      const updateCart = [...cart]
      updateCart[pizzaExists].account++
      setCart(updateCart)
    } else {
      item.account = 1
      setCart([...cart, item]);    
    }
    
  };

  return (
    <>
      <Header 
        cart={cart}
      />
      <main className="container mx-auto mt-10 px-4">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          ¡Elige tu Pizza Favorita!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {pizzas.map((pizza) => (
            <Pizzas 
              key={pizza._id} 
              pizza={pizza}
              addToCart={addToCart}
            />
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
