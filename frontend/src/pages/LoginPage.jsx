import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Login al backend
      const { data } = await axios.post("http://44.214.106.68:4000/api/users/login", { email, password });
      localStorage.setItem('token', data.token);

      // 2. Si backend NO envía avatar, o envía uno vacío, intenta tomarlo del registro local
      let userObj = data.user;
      if (!userObj.avatar || userObj.avatar === "") {
        // Busca el usuario registrado en localStorage (de la lista de usuarios locales, si existe)
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const found = users.find(u => u.email === email);
        if (found && found.avatar) {
          userObj.avatar = found.avatar;
        }
      }

      // 3. Guarda el usuario actualizado
      localStorage.setItem('user', JSON.stringify(userObj));
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || "Error al ingresar");
    }
  };

  return (
    <div className="login-root">
      <style>{`
        .login-root {
          min-height: 100vh;
          display: flex;
          flex-direction: row;
          background: #f8fafc;
        }

        .login-left {
          width: 60%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url('/bg-login.jpg');
          background-size: cover;
          background-position: center;
          color: #fff;
          position: relative;
          transition: width .3s;
        }
        .login-left::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }
        .login-left-content {
          position: relative;
          z-index: 2;
          text-align: center;
        }
        .login-left h1 {
          font-weight: 800;
          font-size: 2.5rem;
          letter-spacing: -1px;
          text-shadow: 0 4px 32px #00000055;
        }

        .login-right {
          width: 40%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          transition: width .3s;
        }
        .login-form-container {
          width: 340px;
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 4px 24px #0ea5e925;
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .login-form-container img {
          width: 80px;
          margin-bottom: 32px;
        }
        .login-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .login-form input {
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          outline: none;
          font-size: 1rem;
          background: #f1f5f9;
          transition: border .2s;
          box-sizing: border-box;
        }
        .login-form button {
          padding: 12px;
          border-radius: 12px;
          background: linear-gradient(90deg,#38bdf8,#0ea5e9);
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 2px 8px #38bdf833;
          transition: background .2s;
        }
        .login-error {
          color: #ef4444;
          margin-top: 8px;
          font-size: 0.98rem;
        }
        .login-register-link {
          margin-top: 20px;
          font-size: 0.95rem;
          color: #64748b;
          text-align: center;
        }
        .login-register-link a {
          color: #0ea5e9;
          font-weight: 600;
          text-decoration: none;
        }

        /* Responsivo: tablets */
        @media (max-width: 900px) {
          .login-left {
            width: 45%;
          }
          .login-right {
            width: 55%;
          }
        }

        /* Responsivo: móviles */
        @media (max-width: 700px) {
          .login-root {
            flex-direction: column;
          }
          .login-left, .login-right {
            width: 100%;
            min-height: 250px;
            padding: 0;
          }
          .login-left {
            min-height: 180px;
            justify-content: flex-end;
          }
          .login-left-content h1 {
            font-size: 1.2rem;
            padding: 12px 10px;
          }
          .login-form-container {
            width: 94vw;
            min-width: 0;
            max-width: 400px;
            padding: 28px 6vw;
            margin-top: 0;
          }
        }
        /* Extra: para pantallas muy pequeñas */
        @media (max-width: 420px) {
          .login-form-container {
            padding: 20px 2vw;
          }
        }
      `}</style>

      {/* Lado izquierdo: Imagen de fondo */}
      <div className="login-left">
        <div className="login-left-content">
          <h1>¡La mejor app para encontrar el departamento de tus sueños!</h1>
        </div>
      </div>
      {/* Lado derecho: Login */}
      <div className="login-right">
        <div className="login-form-container">
          <img src="/logo.png" alt="logo" />
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit">
              Ingresar
            </button>
          </form>
          {error && <p className="login-error">{error}</p>}
          <p className="login-register-link">
            ¿No tienes usuario?{" "}
            <Link to="/register">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
