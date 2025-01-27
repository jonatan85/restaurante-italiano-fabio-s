import { useState, ReactNode } from "react";
import { AuthContext } from "./authContext";

// Envolvemos toda la app.
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
      <AuthContext.Provider value={ { isAuthenticated, login, logout } } >
        {children}
      </AuthContext.Provider>
    );
};
