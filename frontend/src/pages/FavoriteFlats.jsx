import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlatCard from "../components/FlatCard";
import UserBar from "../components/UserBar";
import HomeMenu from "../components/HomeMenu";

export default function FavoriteFlats() {
  const navigate = useNavigate();

  // Usuario simulado desde localStorage
  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const user = {
    _id: userFromStorage?._id,
    name: userFromStorage?.name || "Diego",
    lastName: userFromStorage?.lastName || "Tello",
    avatar: userFromStorage?.avatar || "/user/user-01.jpg",
  };

  // Notificaciones de comentarios (no implementadas aquí)
  const [hasNotification, setHasNotification] = useState(false);

  // Flats (departamentos) desde backend
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Favoritos (persistente)
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const stored = localStorage.getItem("favoriteFlats");
    return stored ? JSON.parse(stored) : [];
  });

  // Cargar flats desde backend al iniciar
  useEffect(() => {
    setLoading(true);
    fetch("http://44.214.106.68:4000/api/flats")
      .then(res => res.json())
      .then(data => {
        setFlats(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setFlats([]);
        setLoading(false);
      });
  }, []);

  // Solo favoritos
  const favoriteFlats = flats.filter(flat => favoriteIds.includes(flat._id || flat.id));

  // Favoritos: alternar
  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => {
      const newFavs = prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id];
      localStorage.setItem("favoriteFlats", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  // Menú Profile y Logout
  function goToProfile(e) {
    e.stopPropagation();
    navigate("/profile");
  }
  function logout(e) {
    e.stopPropagation();
    localStorage.removeItem("user");
    navigate("/login");
  }

  // Borrar cuenta
  const handleDeleteAccount = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      localStorage.removeItem("user");
      alert("Cuenta eliminada.");
      navigate("/login");
    }
  };

  // Ir al detalle de flat
  const handleFlatClick = (flatId) => {
    navigate(`/flats/${flatId}`);
  };

  return (
    <div className="home-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
        .home-root {
          min-height: 100vh;
          background: linear-gradient(90deg, #f8fafc 60%, #38bdf8 100%);
          font-family: 'Montserrat', sans-serif;
        }
        .home-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 38px;
          border-bottom: 1px solid #e0e7ef;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .home-header-logo {
          width: 44px;
        }
        /* Mueve el UserBar a la derecha y elimina el menú sanduche */
        .home-header > *:first-child {
          margin-right: auto;
        }
        .home-header > .user-bar-container {
          margin-left: auto;
        }
        .user-bar-container {
          display: flex;
          align-items: center;
        }
        .home-flats-section {
          margin: 0 38px 36px 38px;
        }
        .home-flats-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
        }
        .flat-card-wrapper {
          position: relative;
          border-radius: 16px;
          overflow: visible;
        }
        .favorite-heart-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 2;
          background: #fff;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 6px #64748b22;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: box-shadow .15s;
        }
        .favorite-heart-btn:hover {
          box-shadow: 0 2px 12px #e11d4822;
          border-color: #e11d48;
        }
        @media (max-width: 900px) {
          .home-header, .home-flats-section {
            margin-left: 8px;
            margin-right: 8px;
          }
          .home-header {
            padding: 14px 10px;
          }
        }
        @media (max-width: 700px) {
          .home-flats-list {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .flat-card-wrapper {
            min-width: 0;
          }
        }
        /* Menú de navegación igual que en HomePage */
        .home-menu-desktop {
          margin-bottom: 0;
        }
        @media (max-width: 600px) {
          .home-menu-desktop {
            display: none !important;
          }
        }
      `}</style>
      {/* HEADER */}
      <div className="home-header">
        <img src="/logo.png" alt="logo" className="home-header-logo" />
        <div className="user-bar-container">
          <UserBar
            user={user}
            hasNotification={hasNotification}
            onBellClick={() => setHasNotification(false)}
            onProfile={goToProfile}
            onLogout={logout}
          />
        </div>
        {/* NO hay botón menú sanduche aquí */}
      </div>
      {/* MENÚ DESKTOP */}
      <div className="home-menu-desktop">
        <HomeMenu onDelete={handleDeleteAccount} />
      </div>
      {/* FAVORITE FLATS */}
      <section className="home-flats-section">
        <h2 style={{
          color: "#0ea5e9",
          margin: "36px 0 24px 0",
          fontSize: "2rem",
          fontWeight: 800,
          letterSpacing: ".01em",
          textAlign: "left"
        }}>
          Departamentos Favoritos
        </h2>
        <div className="home-flats-list">
          {loading ? (
            <div style={{gridColumn: "1/-1", textAlign: "center", color: "#64748b"}}>Cargando...</div>
          ) : favoriteFlats.length === 0 ? (
            <div style={{gridColumn: "1/-1", textAlign: "center", color: "#64748b"}}>No tienes departamentos favoritos.</div>
          ) : (
            favoriteFlats.map(flat => (
              <div
                className="flat-card-wrapper"
                key={flat._id || flat.id}
                style={{cursor: "pointer"}}
                onClick={() => handleFlatClick(flat._id || flat.id)}
              >
                <button
                  className="favorite-heart-btn"
                  onClick={e => {
                    e.stopPropagation();
                    toggleFavorite(flat._id || flat.id);
                  }}
                  aria-label="Quitar de favoritos"
                  tabIndex={0}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#e11d48"
                    stroke="#e11d48"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16.5 4.5A4.5 4.5 0 0 0 12 7.5A4.5 4.5 0 0 0 7.5 4.5C5.4 6.6 5.4 10 7.5 12.1l4.5 4.4 4.5-4.4c2.1-2.1 2.1-5.5 0-7.6z"></path>
                  </svg>
                </button>
                <FlatCard
                  flat={{
                    ...flat,
                    image: flat.imageUrl ? `http://44.214.106.68:4000${flat.imageUrl}` : flat.image || "/no-image.png"
                  }}
                />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
