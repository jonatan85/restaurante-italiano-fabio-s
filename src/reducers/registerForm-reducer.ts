
export type RegisterFormActions = 
  | { type: "setField"; payload: { field: string; value: string } }
  | { type: "resetForm" };

export type RegisterFormState = {
  email: string;
  password: string;
  name: string;
  surname: string;
  address: string;
  postalCode: string;
  city: string;
};

export const initialRegisterFormState: RegisterFormState = {
  email: "",
  password: "",
  name: "",
  surname: "",
  address: "",
  postalCode: "",
  city: "",
};

export const registerFormReducer = (
  state: RegisterFormState = initialRegisterFormState,
  action: RegisterFormActions
): RegisterFormState => {
  switch (action.type) {
    case "setField":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case "resetForm":
      return initialRegisterFormState;
    default:
      return state;
  }
};
