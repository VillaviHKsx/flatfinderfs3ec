import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    birthdate: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // 1. Asignar avatar aleatorio
    const maxAvatars = 37;
    const randomNumber = Math.floor(Math.random() * maxAvatars) + 1;
    const avatarNumber = randomNumber.toString().padStart(2, "0");
    const avatarPath = `/user/user-${avatarNumber}.jpg`;

    try {
      // 2. Envía el registro al backend con el campo avatar (si tu backend lo recibe)
      await axios.post("http://44.214.106.68:4000/api/users/register", {
        ...form,
        avatar: avatarPath,
        confirm: undefined // No envíes el campo confirm
      });

      // 3. Guarda el usuario (sin contraseña) en localStorage para futuro login y avatar
      localStorage.setItem("user", JSON.stringify({
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        birthdate: form.birthdate,
        avatar: avatarPath
      }));

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      background: "linear-gradient(90deg, #f8fafc 60%, #38bdf8 100%)",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "24px",
        boxShadow: "0 4px 24px #0ea5e925",
        padding: "40px 32px",
        width: 430,
        maxWidth: "95vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box"
      }}>
        <img src="/logo.png" alt="logo" style={{ width: 80, marginBottom: 32 }} />
        <form onSubmit={handleRegister} style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          boxSizing: "border-box"
        }}>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              required
              style={{
                flex: 1,
                minWidth: 0,
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                fontSize: "1rem",
                background: "#f1f5f9",
                boxSizing: "border-box"
              }}
            />
            <input
              name="lastName"
              placeholder="Apellido"
              value={form.lastName}
              onChange={handleChange}
              required
              style={{
                flex: 1,
                minWidth: 0,
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                fontSize: "1rem",
                background: "#f1f5f9",
                boxSizing: "border-box"
              }}
            />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              fontSize: "1rem",
              background: "#f1f5f9",
              boxSizing: "border-box"
            }}
          />
          <div style={{ display: "flex", gap: 10 }}>
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                flex: 1,
                minWidth: 0,
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                fontSize: "1rem",
                background: "#f1f5f9",
                boxSizing: "border-box"
              }}
            />
            <input
              name="confirm"
              type="password"
              placeholder="Confirmar contraseña"
              value={form.confirm}
              onChange={handleChange}
              required
              style={{
                flex: 1,
                minWidth: 0,
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                fontSize: "1rem",
                background: "#f1f5f9",
                boxSizing: "border-box"
              }}
            />
          </div>
          <input
            name="birthdate"
            type="date"
            value={form.birthdate}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              fontSize: "1rem",
              background: "#f1f5f9",
              boxSizing: "border-box"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px",
              borderRadius: "12px",
              background: "linear-gradient(90deg,#38bdf8,#0ea5e9)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 8px #38bdf833",
              marginTop: 8
            }}
          >
            Registrarse
          </button>
        </form>
        {error && <p style={{ color: "#ef4444", marginTop: 8 }}>{error}</p>}
        <p style={{
          marginTop: 20,
          fontSize: "0.95rem",
          color: "#64748b"
        }}>
          ¿Ya tienes usuario?{" "}
          <Link to="/login" style={{ color: "#0ea5e9", fontWeight: 600, textDecoration: "none" }}>
            Ingresa aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
