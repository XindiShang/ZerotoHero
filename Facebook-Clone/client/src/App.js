import { useContext } from "react";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user)
  return (
    <Router>
      <Routes>
        <Route path="/" element={user? <Home /> : <Register/>} />
        <Route path="/login" element={user? <Navigate replace to="/" /> : <Login />} />
        <Route path="/register" element={user? <Navigate replace to="/" /> : <Register />} />
        <Route path="/profile/:userName" element={<Profile />} />      
      </Routes>
    </Router>
  );
}

export default App;
