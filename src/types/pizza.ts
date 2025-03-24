import { Ingredient } from "./ingredients";

export type Pizza = {
  _id: string;
  name: string;
  mass: string;
  size: string; 
  dip: string;  
  ingredients: Ingredient[];
  quantity: number;
  price: number;
  account: number;
  isCustom: boolean;
  picture?: string;
  createdAt?: string;
  updatedAt?: string;
};


export type DraftPizza = Omit<Pizza, "createdAt" | "updatedAt">;



export type CartItem = Pizza & {
  account: number;
};


