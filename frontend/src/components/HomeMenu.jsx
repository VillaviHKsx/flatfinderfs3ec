import React from "react";

export default function HomeMenu({ onDelete }) {
  return (
    <nav className="home-menu">
      <a href="/home" className="menu-link">
        {/* Ícono Home */}
        <svg width="20" height="20" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5 10 3l7 6.5" />
          <path d="M4 10v7h12v-7" />
        </svg>
        Home
      </a>
      <a href="/favorites" className="menu-link">
        {/* Ícono Corazón */}
        <svg width="20" height="20" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16.5 4.5A4.5 4.5 0 0 0 10 7.9 4.5 4.5 0 0 0 3.5 4.5C1.4 6.6 1.4 10 3.5 12.1l6.5 6.4 6.5-6.4c2.1-2.1 2.1-5.5 0-7.6z"></path>
        </svg>
        Favorite flats
      </a>
      <a href="/actualizar" className="menu-link">
        {/* Ícono Actualizar/Flat */}
        <svg width="20" height="20" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="7" width="14" height="10" rx="2" />
          <path d="M8 7V5a2 2 0 1 1 4 0v2" />
        </svg>
        Actualizar flats
      </a>
      <button type="button" className="menu-link menu-delete" onClick={onDelete}>
        {/* Ícono Papelera */}
        <svg width="20" height="20" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="7" width="10" height="10" rx="2" />
          <path d="M9 11v4M11 11v4M4 7h12M8 7V5a2 2 0 0 1 4 0v2" />
        </svg>
        Delete cuenta
      </button>
      <style>{`
        .home-menu {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 34px;
          background: #f8fafc;
          border-bottom: 1px solid #e0e7ef;
          padding: 14px 38px;
        }
        .menu-link {
          display: flex;
          align-items: center;
          gap: 7px;
          font-weight: 600;
          color: #64748b;
          text-decoration: none;
          font-size: 1.08rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 3px 12px;
          border-radius: 8px;
          transition: background 0.18s, color 0.15s;
          position: relative;
          white-space: nowrap;
        }
        .menu-link:hover {
          background: #e0f2fe;
          color: #0ea5e9;
        }
        .menu-link svg {
          vertical-align: middle;
          margin-bottom: 2px;
        }
        .menu-delete {
          color: #dc2626;
        }
        .menu-delete svg {
          stroke: #dc2626;
        }
        .menu-delete:hover {
          background: #fee2e2;
          color: #b91c1c;
        }

        /* --- SOLO MOBILE --- */
        @media (max-width: 700px) {
          .home-menu {
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
            gap: 0;
            width: 100%;
            max-width: 100vw;
            padding: 12px 0;
            border-radius: 0 0 18px 18px;
            box-sizing: border-box;
            background: #fff;
          }
          .menu-link {
            width: 100%;
            text-align: left;
            justify-content: flex-start;
            padding: 13px 22px;
            font-size: 1.13rem;
            border-radius: 0;
            border-bottom: 1px solid #e0e7ef;
            white-space: normal;
          }
          .menu-link:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </nav>
  );
}
