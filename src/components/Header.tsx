export default function Header() {
  return (
    <>
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center uppercase">Favio'S</h1>
        </div>
        <nav className="bg-gray-800 p-4">
  <div className="carrito flex justify-end">
    <img
      src="../../public/carrito.png"
      alt="imagen-carrito"
      className="w-8 h-8 cursor-pointer"
    />
  </div>

  <div id="carrito" className="bg-white p-6 rounded-lg shadow-md mt-4">
    <p className="text-center text-gray-600 font-medium">
      El carrito está vacío
    </p>
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
          <tr className="border-t">
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2 font-bold text-gray-700"></td>
            <td className="px-4 py-2 flex items-center gap-2">
              <button
                type="button"
                className="bg-gray-700 text-white px-2 py-1 rounded-md hover:bg-gray-800"
              >
                -
              </button>
              <button
                type="button"
                className="bg-gray-700 text-white px-2 py-1 rounded-md hover:bg-gray-800"
              >
                +
              </button>
            </td>
            <td className="px-4 py-2">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                type="button"
              >
                X
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p className="text-right text-lg font-medium text-gray-800 mt-4">
        Total pagar:
      </p>
    </>

    <button
      className="bg-gray-700 text-white w-full mt-4 py-2 rounded-md hover:bg-gray-800"
    >
      Vaciar Carrito
    </button>
  </div>
</nav>

      </header>
    </>
  );
}
