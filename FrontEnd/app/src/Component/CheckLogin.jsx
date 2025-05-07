import { Navigate } from "react-router-dom";

const CheckLogin = ({ children }) => {
    const token = localStorage.getItem("token"); 
    return token ? children : <Navigate to="/login" replace />;
};

export default CheckLogin;
