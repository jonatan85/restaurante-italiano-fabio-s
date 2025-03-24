import { Dispatch, useMemo } from "react";
import { CartItem } from "../types/pizza";
import { CartActions } from "../reducers/cart-reducer";
import { OrderPayload, placeOrder } from "../service/orders";
import { useNavigate } from "react-router-dom";

type BackOfficeProps = {
  cart: CartItem[];
  dispatch: Dispatch<CartActions>;
};

export default function BackOffice({ cart, dispatch }: BackOfficeProps) {
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const navigate = useNavigate();

  const cartTotal = useMemo(
    () =>
      cart
        .reduce((total, item) => total + item.account * item.price, 0)
        .toFixed(2),
    [cart]
  );

  const handlePlaceOrder = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Debes iniciar sesión para realizar un pedido.");
        navigate("/login"); 
        return;
      }

      const orderPayload: OrderPayload = {
        user: userId,
        pizzas: cart.map((pizza) => ({
          pizza: pizza.isCustom ? { ...pizza, _id: undefined } : pizza._id,
          quantity: pizza.account,
        })),
        total: parseFloat(cartTotal),
      };
      

      await placeOrder(orderPayload);
      dispatch({ type: "clearCart" });
      dispatch({ type: "clearCustomPizzas" });
      alert("¡Pedido realizado con éxito!");
      navigate("/order-success");
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
      alert("Hubo un error al realizar el pedido. Inténtalo de nuevo.");
    }
  };

  return (
    <>
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 md:p-8 border border-gray-300">
        <h2 className="text-black text-2xl md:text-3xl font-extrabold uppercase mb-4 md:mb-6 text-center sm:text-left">
          Resumen de compras
        </h2>
        <div>
          {isEmpty ? (
            <p className="text-gray-500 text-base md:text-lg font-medium text-center sm:text-left">
              No hay productos en el carrito.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <thead className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 uppercase text-xs md:text-sm font-bold">
                  <tr>
                    <th className="p-2 md:p-4 text-left border border-gray-300">
                      Imagen
                    </th>
                    <th className="p-2 md:p-4 text-left border border-gray-300">
                      Nombre
                    </th>
                    <th className="p-2 md:p-4 text-left border border-gray-300">
                      Precio
                    </th>
                    <th className="p-2 md:p-4 text-left border border-gray-300">
                      Cantidad
                    </th>
                    <th className="p-2 md:p-4 text-left border border-gray-300">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map((pizza) => (
                    <tr
                      key={pizza._id}
                      className="hover:bg-gray-50 transition-all duration-200"
                    >
                      <td className="p-2 md:p-4 border border-gray-300">
                        <img
                          className="rounded-lg w-16 h-16 md:w-20 md:h-20 object-cover shadow-md"
                          src={pizza.picture}
                          alt={`Imagen de la pizza ${pizza.name}`}
                        />
                      </td>
                      <td className="p-2 md:p-4 border border-gray-300 font-semibold text-gray-800 text-sm md:text-base">
                        {pizza.name}
                      </td>
                      <td className="p-2 md:p-4 border border-gray-300 text-yellow-500 font-bold text-sm md:text-lg">
                        ${pizza.price.toFixed(2)}
                      </td>
                      <td className="p-2 md:p-4 border border-gray-300">
                        <div className="flex items-center justify-center gap-1 md:gap-2">
                          <button
                            type="button"
                            className="bg-yellow-500 text-white rounded-full px-2 py-1 md:px-3 md:py-1 font-bold text-sm md:text-lg shadow-md hover:bg-yellow-600 transition-all duration-300"
                            onClick={() =>
                              dispatch({
                                type: "decreaseAccount",
                                payload: { id: pizza._id },
                              })
                            }
                          >
                            -
                          </button>
                          <span className="text-sm md:text-lg font-bold text-gray-800 w-6 md:w-8 text-center">
                            {pizza.account}
                          </span>
                          <button
                            type="button"
                            className="bg-yellow-500 text-white rounded-full px-2 py-1 md:px-3 md:py-1 font-bold text-sm md:text-lg shadow-md hover:bg-yellow-600 transition-all duration-300"
                            onClick={() =>
                              dispatch({
                                type: "increaseAccount",
                                payload: { id: pizza._id },
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-2 md:p-4 border border-gray-300 text-center">
                        <button
                          type="button"
                          className="bg-red-500 text-white rounded-full px-3 py-1 md:px-4 md:py-2 font-bold text-sm md:text-md shadow-md hover:bg-red-600 transition-all duration-300"
                          onClick={() =>
                            dispatch({
                              type: "removeFromCart",
                              payload: { id: pizza._id },
                            })
                          }
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xl md:text-2xl font-extrabold text-yellow-500 mt-6 md:mt-8 text-center sm:text-left">
                Total a pagar: <span className="text-black">${cartTotal}</span>
              </p>
            </div>
          )}
          <div className="mt-6 md:mt-8 text-center">
            <button
              className={`w-full md:w-auto rounded-lg px-6 py-3 md:px-8 md:py-4 font-bold text-lg shadow-md transition-all duration-300 ${
                isEmpty
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700"
              }`}
              onClick={handlePlaceOrder}
              disabled={isEmpty}
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
