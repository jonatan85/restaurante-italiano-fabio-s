import AxiosApi from "./axiosApi";
import { Ingredient } from "../types/ingredients";

export const getIngredients = async (): Promise<Ingredient[]> => {
    const response = await AxiosApi.get<Ingredient[]>('/ingredients');
    return response.data;
}