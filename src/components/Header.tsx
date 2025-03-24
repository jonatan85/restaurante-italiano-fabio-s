import { Dispatch, useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { Pizza } from "../types/pizza";
import { CartActions } from "../reducers/cart-reducer";
import Logout from "./Logout";

type HeaderPorps = {
  cart: Pizza[];
  dispatch: Dispatch<CartActions>;
};

export default function Header({ cart, dispatch }: HeaderPorps) {
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
 

  const totalItems = useMemo(
    () => cart.reduce((total, pizza) => total + pizza.account, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () =>
      cart
        .reduce((total, item) => total + item.account * item.price, 0)
        .toFixed(2),
    [cart]
  );

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("authToken"));
  }, []);

  return (
    <>
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-5xl font-extrabold text-center uppercase tracking-wider">
            Fabio'S
          </h1>
        </div>
        <nav className="relative bg-gray-900 p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-4 border-yellow-500 px-4 py-2"
                    : "text-gray-300 hover:text-white px-4 py-2 hover:border-b-4 hover:border-yellow-500 transition-all"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/crear-pizza"
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-4 border-yellow-500 px-4 py-2"
                    : "text-gray-300 hover:text-white px-4 py-2 hover:border-b-4 hover:border-yellow-500 transition-all"
                }
              >
                Crear Pizza
              </NavLink>

              <NavLink
                to="/back-office"
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-4 border-yellow-500 px-4 py-2"
                    : "text-gray-300 hover:text-white px-4 py-2 hover:border-b-4 hover:border-yellow-500 transition-all"
                }
              >
                Resumen de Compra
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-4 border-yellow-500 px-4 py-2"
                    : "text-gray-300 hover:text-white px-4 py-2 hover:border-b-4 hover:border-yellow-500 transition-all"
                }
              >
                <p>¿Eres Nuevo?</p>
                <p>Crea Tu Cuenta</p>
              </NavLink>

              {!isAuthenticated ? (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white border-b-4 border-yellow-500 px-4 py-2"
                      : "text-gray-300 hover:text-white px-4 py-2 hover:border-b-4 hover:border-yellow-500 transition-all"
                  }
                >
                  Iniciar Sesión
                </NavLink>
              ) : (
                <Logout setIsAuthenticated={setIsAuthenticated} /> 
              )}
            </div>

            <div className="carrito relative group">
              <img
                src="/public/carrito.png"
                alt="imagen-carrito"
                className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
              />

              {totalItems > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}

              <div className="absolute right-0 mt-4 w-[45rem] bg-white p-6 rounded-lg shadow-lg opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
                {isEmpty ? (
                  <p className="text-center text-gray-600 font-medium">
                    El carrito está vacío
                  </p>
                ) : (
                  <>
                    <table className="table-auto w-full mt-4 text-left border-collapse">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                            Imagen
                          </th>
                          <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                            Nombre
                          </th>
                          <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                            Precio
                          </th>
                          <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                            Cantidad
                          </th>
                          <th className="px-4 py-2 text-sm font-semibold text-gray-700"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((pizza) => (
                          <tr key={pizza._id} className="border-t">
                            <td className="px-4 w-1/6">
                              <img
                                className="rounded-lg object-cover w-20 h-20"
                                src={pizza.picture}
                                alt="pizza-imagen"
                              />
                            </td>
                            <td className="px-4 py-2 font-bold text-gray-700">
                              {pizza.name}
                            </td>
                            <td className="px-4 py-2 font-bold text-gray-700">
                              ${pizza.price.toFixed(2)}
                            </td>
                            <td className="px-4 py-7 flex items-center gap-2">
                              <button
                                type="button"
                                className="bg-gray-700 text-white px-2 py-1 rounded-md hover:bg-gray-800"
                                onClick={() =>
                                  dispatch({
                                    type: "decreaseAccount",
                                    payload: { id: pizza._id },
                                  })
                                }
                              >
                                -
                              </button>
                              <div className="text-gray-700 px-2 py-1">
                                {pizza.account}
                              </div>
                              <button
                                type="button"
                                className="bg-gray-700 text-white px-2 py-1 rounded-md hover:bg-gray-800"
                                onClick={() =>
                                  dispatch({
                                    type: "increaseAccount",
                                    payload: { id: pizza._id },
                                  })
                                }
                              >
                                +
                              </button>
                            </td>
                            <td className="px-4 py-2">
                              <button
                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                type="button"
                                onClick={() =>
                                  dispatch({
                                    type: "removeFromCart",
                                    payload: { id: pizza._id },
                                  })
                                }
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-right text-xl font-semibold text-gray-900 mt-4">
                      Total a pagar:{" "}
                      <span className="font-bold text-red-500">
                        ${cartTotal}
                      </span>
                    </p>
                  </>
                )}
                {!isEmpty && (
                  <>
                    <button
                      className="bg-red-500 text-white w-full mt-4 py-2 rounded-md hover:bg-red-600"
                      onClick={() =>
                        dispatch({
                          type: "clearCart",
                        })
                      }
                    >
                      Vaciar Carrito
                    </button>
                    <button className="bg-red-500 text-white w-full mt-4 py-2 rounded-md hover:bg-red-600">
                      <NavLink to="/back-office">Resumen de Compra</NavLink>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
