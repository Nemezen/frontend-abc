import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Generic/Navbar";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import ReservaForm from "./components/Reservation/ReservaForm.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard";
import BusquedaReserva from "./components/Reservation/BusquedaReserva.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { isAdminBool } from "./services/authService.js";

function App() {

  const isAuth = localStorage.getItem("authToken");
  
  const [user, setUser] = useState(null);
  
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const checkRole = async () => {
      const response = await isAdminBool();
      setIsAdmin(response.data);
    };
    checkRole();
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("nombre",userData.username);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="align-items-center d-flex vw-100 vh-100 flex-column">
      <Router>
        {isAuth && (
          <Navbar isAdmin={isAdmin} onLogout={handleLogout} />
        )}
        <div className="mt-4">
          <Routes>
            <Route
              path="/login"
              element={
                !isAuth ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/"
              element={
                isAuth ? (
                  <Home isAdmin={isAdmin} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/reservar"
              element={
                isAuth ? <ReservaForm /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/reservas/:folio"
              element={
                isAuth ? <BusquedaReserva /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/admin"
              element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
