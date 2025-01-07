import { Dispatch, useMemo } from "react";
import { Pizza } from "../types/pizza";
import { CartActions } from "../reducers/cart-reducer";

type HeaderPorps = {
  cart: Pizza[];
  dispatch: Dispatch<CartActions>;
};

export default function Header({ cart, dispatch }: HeaderPorps) {
  const isEmpty = useMemo(() => cart.length === 0, [cart]);

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

  return (
    <>
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center uppercase">Fabio'S</h1>
        </div>
        <nav className="relative bg-gray-800 p-4">
          <div className="carrito flex justify-end">
            <div className="relative group">
              <img
                src="/public/carrito.png"
                alt="imagen-carrito"
                className="w-8 h-8 cursor-pointer"
              />

              {totalItems > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              
              {/* Mejorar toda la logica de el carrito */}
              <div className="absolute right-0 mt-2 w-[45rem] bg-white p-6 rounded-lg shadow-lg opacity-0 transition-opacity duration-1000 delay-1000 group-hover:opacity-100 group-hover:delay-0">
                {isEmpty ? (
                  <p className="text-center text-gray-600 font-medium">
                    El carrito está vacío
                  </p>
                ) : (
                  <>
                    <table className="table-auto w-full mt-4 text-left border-collapse">
                      <thead className="bg-gray-200">
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
                              {pizza.price}
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
                    <p className="text-right text-lg font-medium text-gray-800 mt-4">
                      Total pagar:{" "}
                      <span className="font-bold">${cartTotal}</span>
                    </p>
                  </>
                )}
                {!isEmpty && (
                  <button
                    className="bg-gray-700 text-white w-full mt-4 py-2 rounded-md hover:bg-gray-800"
                    onClick={() =>
                      dispatch({
                        type: "clearCart",
                      })
                    }
                  >
                    Vaciar Carrito
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
