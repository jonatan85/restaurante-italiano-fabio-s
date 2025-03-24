export interface User {
  email: string;
  password: string;
  name?: string;
  surnames?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  phoneNumber?: string;
  country?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  user: {
    id: string;
    email: string;
  };
  token: string;
};

