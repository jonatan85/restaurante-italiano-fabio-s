export type Pizza = {
  id: string;
  name: string;
  mass: string[];
  size: string[];
  dip: string[];
  ingredients: string[];
  price: number;
  account?: number;
  picture?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type DraftPizza = Omit<Pizza, "createdAt" | "updatedAt">;

export type Ingredient = {
  id: string;
  name: string;
  isVegan: boolean;
};
