import React, { useState, useRef, useEffect } from "react";

export default function UserBar({
  user,
  onProfile,
  onLogout,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const [hasNotification, setHasNotification] = useState(false);

  // Consulta comentarios sin responder cada 10s
  useEffect(() => {
    let intervalId;

    const fetchUnanswered = () => {
      if (!user || !user._id) return;
      fetch(`http://44.214.106.68:4000/api/notifications/unanswered-comments/${user._id}`)
        .then(res => res.json())
        .then(data => {
          setHasNotification(data.length > 0);
        })
        .catch(() => setHasNotification(false));
    };

    fetchUnanswered();
    intervalId = setInterval(fetchUnanswered, 10000);
    return () => clearInterval(intervalId);
  }, [user]);

  // Cerrar el menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Al hacer clic en la campana puedes marcar como leídas si quieres (opcional)
  function handleBellClick() {
    setHasNotification(false); // Oculta el punto visualmente
    // Si quieres, haz un fetch para marcar como leídas en el backend aquí
  }

  return (
    <div className="userbar-root">
      <style>{`
        .userbar-root {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .userbar-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #0ea5e9;
          object-fit: cover;
          background: #f3f4f6;
        }
        .notif-bell {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #f1f5f9;
          cursor: pointer;
          transition: background .18s;
        }
        .notif-bell:hover {
          background: #e0f2fe;
        }
        .notif-bell svg {
          font-size: 1.6rem;
          color: #0ea5e9;
        }
        .notif-dot {
          position: absolute;
          top: 9px;
          right: 8px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #fb923c;
          border: 2px solid #fff;
          box-shadow: 0 0 0 2px #f1f5f9;
          animation: notifDotPop .4s;
        }
        @keyframes notifDotPop {
          0% { transform: scale(0.3);}
          80% { transform: scale(1.2);}
          100% { transform: scale(1);}
        }
        .userbar-hi-block {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: 10px;
          position: relative;
          cursor: pointer;
          user-select: none;
        }
        .userbar-hi-block span {
          color: #334155;
          font-weight: 400;
          font-size: 1.07rem;
          letter-spacing: -0.5px;
        }
        .userbar-hi-block svg {
          margin-left: 3px;
          color: #64748b;
          transition: transform .18s;
        }
        .userbar-hi-block.open svg {
          transform: rotate(180deg);
        }
        .userbar-dropdown {
          position: absolute;
          right: 0;
          top: 120%;
          min-width: 150px;
          background: #fff;
          color: #334155;
          box-shadow: 0 6px 36px #0ea5e911;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          padding: 8px 0;
        }
        .userbar-dropdown-btn {
          background: none;
          border: none;
          font-size: 1rem;
          color: #334155;
          padding: 10px 18px;
          text-align: left;
          cursor: pointer;
          width: 100%;
          transition: background .15s;
        }
        .userbar-dropdown-btn:hover {
          background: #e0f2fe;
        }
      `}</style>
      <img
        className="userbar-avatar"
        src={user.avatar || "/user/default.jpg"}
        alt={user.name}
      />
      <span className="notif-bell" onClick={handleBellClick} title="Notificaciones">
        {/* Campana SVG */}
        <svg viewBox="0 0 24 24" width={26} height={26} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        {hasNotification && <span className="notif-dot"></span>}
      </span>
      <div
        className={`userbar-hi-block${dropdownOpen ? " open" : ""}`}
        onClick={() => setDropdownOpen((open) => !open)}
        ref={dropdownRef}
        tabIndex={0}
      >
        <span>
          Hi, {user.name} {user.lastName}
        </span>
        {/* Flecha */}
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 9 12 12 9" />
        </svg>
        {dropdownOpen && (
          <div className="userbar-dropdown">
            <button className="userbar-dropdown-btn" onClick={onProfile}>
              Profile
            </button>
            <button className="userbar-dropdown-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
