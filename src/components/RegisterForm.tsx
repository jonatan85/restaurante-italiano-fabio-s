import { useReducer, useState } from "react";
import { registerUser } from "../service/registerService";
import {
  registerFormReducer,
  initialRegisterFormState,
} from "../reducers/registerForm-reducer";
import { NavLink } from "react-router-dom";

export default function RegisterForm() {
  const [state, dispatch] = useReducer(
    registerFormReducer,
    initialRegisterFormState
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "setField",
      payload: { field: e.target.name, value: e.target.value },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await registerUser(state);
      setSuccess(response.message);
      dispatch({ type: "resetForm" });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-lg w-full border border-gray-700">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-yellow-500 uppercase tracking-wide">
          Registro de Usuario
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="text-gray-400 font-medium">Email:</span>
            <input
              type="email"
              name="email"
              placeholder="Introduce tu email"
              onChange={handleChange}
              value={state.email}
              required
              className="block w-full mt-2 px-4 py-3 border border-gray-600 rounded-lg shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </label>

          <label className="block">
            <span className="text-gray-400 font-medium">Contraseña:</span>
            <input
              type="password"
              name="password"
              placeholder="Introduce tu contraseña"
              onChange={handleChange}
              value={state.password}
              required
              className="block w-full mt-2 px-4 py-3 border border-gray-600 rounded-lg shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </label>

          <label className="block">
            <span className="text-gray-400 font-medium">Nombre:</span>
            <input
              type="text"
              name="name"
              placeholder="Introduce tu nombre"
              onChange={handleChange}
              value={state.name}
              required
              className="block w-full mt-2 px-4 py-3 border border-gray-600 rounded-lg shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </label>

          <label className="block">
            <span className="text-gray-400 font-medium">Apellidos:</span>
            <input
              type="text"
              name="surname"
              placeholder="Introduce tus apellidos"
              onChange={handleChange}
              value={state.surname}
              className="block w-full mt-2 px-4 py-3 border border-gray-600 rounded-lg shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </label>

          <label className="block">
            <span className="text-gray-400 font-medium">Dirección:</span>
            <input
              type="text"
              name="address"
              placeholder="Introduce tu dirección"
              onChange={handleChange}
              value={state.address}
              className="block w-full mt-2 px-4 py-3 border border-gray-600 rounded-lg shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </label>

          <label className="block">
            <span className="text-gray-400 font-medium">Código Postal:</span>
            <input
              type="text"
              name="postalCode"
              placeholder="Introduce tu código postal"
              onChange={handleChange}
              value={state.postalCode}
              pattern="^\d{5}$"
              className="block w-full mt-2 px-4 py-3 border border-gray-600 rounded-lg shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </label>

          <label className="block">
            <span className="text-gray-400 font-medium">Ciudad:</span>
            <input
              type="text"
              name="city"
              placeholder="Introduce tu ciudad"
              onChange={handleChange}
              value={state.city}
              className="block w-full mt-2 px-4 py-3 border border-gray-600 rounded-lg shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </label>

          {error && (
            <p className="text-center text-red-500 font-semibold">{error}</p>
          )}
          {success && (
            <p className="text-center text-green-500 font-semibold">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold py-3 rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
          >
            <NavLink to="/login">Registrar</NavLink>
          </button>
        </form>
      </div>
    </div>
  );
}
