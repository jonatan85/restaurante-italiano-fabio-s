import { useNavigate } from "react-router-dom";

type logoutProps = {
  setIsAuthenticated: (value: boolean) => void
};

const Logout = ({ setIsAuthenticated }: logoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false); 
    window.dispatchEvent(new Event("storage")); 
    navigate("/login");  
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-300 hover:text-white px-4 py-2 hover:border-b-4 hover:border-yellow-500 transition-all"
    >
      Cerrar Sesión
    </button>
  );
};

export default Logout;
