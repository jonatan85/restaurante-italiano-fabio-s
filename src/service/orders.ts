import AxiosApi from "./axiosApi";
import { Pizza } from "../types/pizza";

type CustomPizza = Omit<Pizza, "_id">;

export type OrderPayload = {
  user: string;
  pizzas: {
    pizza: CustomPizza | string; 
    quantity: number;
  }[];
  total: number;
};

export const placeOrder = async (orderData: OrderPayload): Promise<void> => {
  const response = await AxiosApi.post("/orders", orderData);
  return response.data;
};
