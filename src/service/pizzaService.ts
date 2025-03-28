import AxiosApi from "./axiosApi";
import { Pizza } from "../types/pizza";

export const getPizzas = async (): Promise<Pizza[]> => {
    const response = await AxiosApi.get<Pizza[]>('/pizzas');
    return response.data;
}