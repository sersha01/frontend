import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


function PrivateRoute({ children }) {
    const {user} = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
  }

function AdminRoute({ children }) {
    const {user} = useContext(AuthContext);
    return user && user.isAdmin ? children : <Navigate to="/admin/login" />;
  }

export { 
  PrivateRoute,
  AdminRoute
}