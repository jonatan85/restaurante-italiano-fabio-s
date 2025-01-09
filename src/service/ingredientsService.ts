import AxiosApi from "./axiosApi";
import { Ingredients } from "../types/ingredients";

export const getIngredients = async (): Promise<Ingredients[]> => {
    const response = await AxiosApi.get<Ingredients[]>('/ingredients');
    return response.data;
}