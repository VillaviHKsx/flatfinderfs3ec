import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlatCard from "../components/FlatCard";
import UserBar from "../components/UserBar";
import HomeMenu from "../components/HomeMenu";
import FlatForm from "../components/FlatForm"; 

export default function HomePage() {
  const navigate = useNavigate();

  // Usuario simulado desde localStorage
  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const user = {
    _id: userFromStorage?._id,
    name: userFromStorage?.name || "Diego",
    lastName: userFromStorage?.lastName || "Tello",
    avatar: userFromStorage?.avatar || "/user/user-01.jpg",
  };

  const [hasNotification, setHasNotification] = useState(false);
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  const [favoriteIds, setFavoriteIds] = useState(() => {
    const stored = localStorage.getItem("favoriteFlats");
    return stored ? JSON.parse(stored) : [];
  });

  const [filters, setFilters] = useState({
    city: "",
    area: "",
    airConditioner: false,
    price: "",
  });

  const [filteredFlats, setFilteredFlats] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchFlats();
  }, []);

  const fetchFlats = () => {
    setLoading(true);
    fetch("http://44.214.106.68:4000/api/flats")
      .then(res => res.json())
      .then(data => {
        setFlats(data);
        setFilteredFlats(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    let result = flats;
    if (filters.city.trim()) {
      result = result.filter(flat =>
        flat.city?.toLowerCase().includes(filters.city.trim().toLowerCase())
      );
    }
    if (filters.area) {
      result = result.filter(flat =>
        Number(flat.area) >= Number(filters.area)
      );
    }
    if (filters.airConditioner) {
      result = result.filter(flat => flat.airConditioner === true);
    }
    if (filters.price) {
      result = result.filter(flat => Number(flat.price) <= Number(filters.price));
    }
    setFilteredFlats(result);
  }, [filters, flats]);

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => {
      const newFavs = prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id];
      localStorage.setItem("favoriteFlats", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  function goToProfile(e) {
    e.stopPropagation();
    navigate("/profile");
  }
  function logout(e) {
    e.stopPropagation();
    localStorage.removeItem("user");
    navigate("/login");
  }

  const handleDeleteAccount = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      localStorage.removeItem("user");
      alert("Cuenta eliminada.");
      navigate("/login");
    }
  };

  const handleClearFilters = () => {
    setFilters({
      city: "",
      area: "",
      airConditioner: false,
      price: "",
    });
  };

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
        .home-filters-section {
          margin: 32px 38px 24px 38px;
          padding: 20px;
          border-radius: 16px;
          background: #fff;
          border: 1px solid #e0e7ef;
          box-shadow: 0 2px 12px #38bdf811;
          max-width: 100%;
          box-sizing: border-box;
        }
        .home-filters-form {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
        .home-filters-form input,
        .home-filters-form select,
        .home-filters-form button {
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          font-size: 1rem;
          background: #f1f5f9;
          outline: none;
          transition: border .2s;
          max-width: 100%;
          box-sizing: border-box;
        }
        .home-filters-form input[type="checkbox"] {
          accent-color: #38bdf8;
          transform: scale(1.2);
          margin-left: 6px;
          margin-right: 2px;
          width: auto;
        }
        .home-filters-form input[type="file"] {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
          background: #fff;
        }
        .home-filters-form label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 1rem;
          color: #334155;
          font-weight: 500;
        }
        .home-filters-form button {
          padding: 10px 22px;
          border-radius: 10px;
          background: linear-gradient(90deg,#38bdf8,#0ea5e9);
          color: #fff;
          font-weight: 700;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 1px 4px #38bdf822;
          transition: background .2s;
        }
        .home-filters-form .clear-btn {
          background: #f1f5f9;
          color: #334155;
          border: 1px solid #e2e8f0;
          margin-left: 8px;
        }
        .home-flats-section {
          margin: 0 38px 36px 38px;
        }
        .home-flats-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
        }
        /* FlatCard responsivo y corazón adentro */
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
        /* Menú mobile */
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 2rem;
          margin-left: 18px;
          cursor: pointer;
        }
        .home-menu-mobile {
          display: none;
        }
        @media (max-width: 900px) {
          .home-header, .home-filters-section, .home-flats-section {
            margin-left: 8px;
            margin-right: 8px;
          }
          .home-header {
            padding: 14px 10px;
          }
        }
        @media (max-width: 700px) {
          .home-filters-section {
            padding: 12px;
            margin-left: 4px;
            margin-right: 4px;
            max-width: 100vw;
            overflow-x: auto;
            box-sizing: border-box;
          }
          .home-filters-form {
            flex-direction: column;
            gap: 10px;
            align-items: stretch;
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
          }
          .home-filters-form input,
          .home-filters-form select,
          .home-filters-form button {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            box-sizing: border-box;
          }
          .home-filters-form input[type="file"] {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            box-sizing: border-box;
          }
          .home-flats-list {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .flat-card-wrapper {
            min-width: 0;
          }
        }
        @media (max-width: 600px) {
          .home-header {
            flex-direction: row;
            align-items: center;
          }
          .menu-toggle {
            display: block;
          }
          .home-menu-desktop {
            display: none !important;
          }
          .home-menu-mobile {
            display: block;
            padding: 12px 0;
            background: #fff;
            border-bottom: 1px solid #e0e7ef;
            margin-bottom: 12px;
            border-radius: 0 0 18px 18px;
            z-index: 20;
            position: absolute;
            width: 100vw;
            left: 0;
            top: 62px;
            box-shadow: 0 2px 16px #64748b18;
            animation: fadein .19s;
          }
          @keyframes fadein {
            from { opacity: 0; transform: translateY(-24px);}
            to { opacity: 1; transform: translateY(0);}
          }
        }
      `}</style>
      {/* HEADER */}
      <div className="home-header">
        <img src="/logo.png" alt="logo" className="home-header-logo" />
        <UserBar
          user={user}
          hasNotification={hasNotification}
          onBellClick={() => setHasNotification(false)}
          onProfile={goToProfile}
          onLogout={logout}
        />
        <button
          className="menu-toggle"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MENÚ DESKTOP */}
      <div className="home-menu-desktop">
        <HomeMenu onDelete={handleDeleteAccount} />
      </div>
      {/* MENÚ MOBILE */}
      {menuOpen && (
        <div className="home-menu-mobile">
          <HomeMenu onDelete={handleDeleteAccount} />
        </div>
      )}

      {/* FILTROS */}
      <section className="home-filters-section">
        <form
          className="home-filters-form"
          onSubmit={e => { e.preventDefault(); /* el filtrado es reactivo */ }}
        >
          <input
            placeholder="Ciudad"
            value={filters.city}
            onChange={e => setFilters(f => ({ ...f, city: e.target.value }))}
          />
          <input
            placeholder="Área mínima (m²)"
            type="number"
            value={filters.area}
            onChange={e => setFilters(f => ({ ...f, area: e.target.value }))}
          />
          <label>
            Aire acondicionado
            <input
              type="checkbox"
              checked={filters.airConditioner}
              onChange={e => setFilters(f => ({ ...f, airConditioner: e.target.checked }))}
            />
          </label>
          <input
            placeholder="Precio máximo"
            type="number"
            value={filters.price}
            onChange={e => setFilters(f => ({ ...f, price: e.target.value }))}
          />
          <button type="submit">Filtrar</button>
          <button type="button" className="clear-btn" onClick={handleClearFilters}>Limpiar</button>
        </form>
      </section>

      {/* FORMULARIO PARA AGREGAR NUEVO FLAT */}
      <section className="home-filters-section">
        <h3 style={{marginBottom:12}}>Agregar Nuevo Departamento</h3>
        <FlatForm onFlatCreated={fetchFlats} />
      </section>

      {/* DEPARTAMENTOS */}
      <section className="home-flats-section">
        <div className="home-flats-list">
          {loading ? (
            <div style={{gridColumn: "1/-1", textAlign: "center", color: "#64748b"}}>Cargando...</div>
          ) : filteredFlats.length === 0 ? (
            <div style={{gridColumn: "1/-1", textAlign: "center", color: "#64748b"}}>No hay resultados para los filtros seleccionados.</div>
          ) : (
            filteredFlats.map(flat => (
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
                  aria-label="Marcar como favorito"
                  tabIndex={0}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={favoriteIds.includes(flat._id || flat.id) ? "#e11d48" : "none"}
                    stroke={favoriteIds.includes(flat._id || flat.id) ? "#e11d48" : "#64748b"}
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
