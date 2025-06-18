export default function FlatCard({ flat }) {
  return (
    <div className="flat-card">
      <style>{`
        .flat-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 18px #38bdf822;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform .15s, box-shadow .15s;
        }
        .flat-card:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 8px 32px #0ea5e955;
        }
        .flat-card-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          background: #f1f5f9;
        }
        .flat-card-body {
          padding: 18px 18px 14px 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .flat-card-city {
          font-weight: 700;
          font-size: 1.07rem;
          color: #0ea5e9;
          margin-bottom: 2px;
        }
        .flat-card-row {
          font-size: 1rem;
          color: #334155;
        }
        .flat-card-footer {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .flat-card-price {
          color: #22c55e;
          font-weight: 800;
          font-size: 1.09rem;
        }
        .flat-card-ac {
          background: #38bdf8;
          color: #fff;
          border-radius: 8px;
          padding: 2px 10px;
          font-size: 0.91rem;
          font-weight: 600;
        }
      `}</style>
      <img className="flat-card-img" src={flat.image} alt="departamento" />
      <div className="flat-card-body">
        <div className="flat-card-city">{flat.city}</div>
        <div className="flat-card-row">Área: {flat.area} m²</div>
        <div className="flat-card-footer">
          <span className="flat-card-price">${flat.price}</span>
          <span className="flat-card-ac">
            {flat.airConditioner ? "A/C" : "Sin A/C"}
          </span>
        </div>
      </div>
    </div>
  );
}