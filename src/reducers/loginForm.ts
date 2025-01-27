import { LoginRequest } from "../types/user";

export type LoginFormActions = 
  | { type: "setField"; payload: { index: number; field: keyof LoginRequest; value: string } }
  | { type: "resetForm" };

export type LoginFormState = {
  data: LoginRequest[];
};

export const initialLoginFormState: LoginFormState = {
  data: [
    {
      email: "",
      password: ""
    }
  ]
};

export const loginFormReducer = (
  state: LoginFormState = initialLoginFormState,
  action: LoginFormActions
): LoginFormState => {
  switch (action.type) {
    case "setField":
      return {
        ...state,
        data: state.data.map((item, idx) =>
          idx === action.payload.index
            ? { ...item, [action.payload.field]: action.payload.value }
            : item
        )
      };
    case "resetForm":
      return initialLoginFormState;
    default:
      return state;
  }
};
