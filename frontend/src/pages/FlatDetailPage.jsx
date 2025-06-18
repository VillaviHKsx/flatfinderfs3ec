import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FlatComments from "../components/FlatComments";

export default function FlatDetailPage() {
  const { flatId } = useParams();
  const navigate = useNavigate();
  const [flat, setFlat] = useState(null);
  const [loading, setLoading] = useState(true);

  // Usuario actual desde localStorage
  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const currentUser = {
    _id: userFromStorage?._id,
    name: userFromStorage?.name || "Diego",
    avatar: userFromStorage?.avatar || "/user/user-01.jpg",
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://44.214.106.68:4000/api/flats/${flatId}`)
      .then(res => {
        if (!res.ok) throw new Error("No encontrado");
        return res.json();
      })
      .then(setFlat)
      .catch(() => navigate("/home"))
      .finally(() => setLoading(false));
  }, [flatId, navigate]);

  if (loading) return <div style={{padding:32}}>Cargando...</div>;
  if (!flat) return <div style={{padding:32}}>Departamento no encontrado</div>;

  console.log("flat:", flat);
  console.log("currentUser:", currentUser);
  return (
    <div style={{
    fontFamily: "Montserrat, sans-serif",
    padding: 32,
    maxWidth: 700,
    margin: "0 auto",
    background: "#f7fafd",
    borderRadius: 18,
    boxShadow: "0 4px 30px rgba(0,0,0,0.07)",
    border: "1px solid #e0e7ef"
  }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 20,
          background: "#fff",
          color: "#0ea5e9",
          border: "1px solid #b6e0fe",
          borderRadius: 6,
          padding: "6px 14px",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 0.15s"
        }}
      >
        ← Volver
      </button>
      <h2 style={{
        color:"#0ea5e9",
        marginBottom: 18,
        fontWeight: 700,
        letterSpacing: ".01em"
      }}>{flat.city}</h2>
      <img
        src={flat.imageUrl ? `http://44.214.106.68:4000${flat.imageUrl}` : flat.image || "/no-image.png"}
        alt="departamento"
        style={{
          width: "100%",
          borderRadius: 15,
          marginBottom: 30,
          boxShadow: "0 2px 18px rgba(0,0,0,0.08)"
        }}
      />
      <div style={{
        marginBottom: 22,
        fontSize: 17,
        color: "#222",
        lineHeight: 1.6
      }}>
        <div><b>Área:</b> {flat.area} m²</div>
        <div><b>Precio:</b> ${flat.price}</div>
        <div><b>Aire acondicionado:</b> {flat.airConditioner ? "Sí" : "No"}</div>
      </div>
      <FlatComments flat={flat} currentUser={currentUser} />
    </div>
  );
}
