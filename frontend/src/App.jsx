import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import FavoriteFlats from "./pages/FavoriteFlats";
import FlatDetailPage from "./pages/FlatDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/favorites" element={<FavoriteFlats />} />
        <Route path="/flats/:flatId" element={<FlatDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
