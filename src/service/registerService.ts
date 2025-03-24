import AxiosApi from "./axiosApi";
import { LoginRequest, LoginResponse, User } from "../types/user.ts";

interface RegisterResponse {
  message: string;
  user: User;
}

export const registerUser = async (
  userData: User
): Promise<RegisterResponse> => {
  try {
    const response = await AxiosApi.post<RegisterResponse>(
      "/users-dos/register",
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al registrar el usuario");
  }
};

export const loginUserJwt = async (
  userData: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await AxiosApi.post<LoginResponse>(
      "/users-dos/login-jwt",
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al logearse el usuario");
  }
};

export const logoutUserJwt = async (): Promise<string> => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const response = await AxiosApi.post<string>(
      "/users-dos/logout-jwt",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem("authToken");

    return response.data;
  } catch (error) {
    throw new Error("Error al cerrar sesión");
  }
};
