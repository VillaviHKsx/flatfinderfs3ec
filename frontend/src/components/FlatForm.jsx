import React, { useState } from "react";

export default function FlatForm({ onFlatCreated }) {
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [airConditioner, setAirConditioner] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // 1. Obtén el usuario actual
  const user = JSON.parse(localStorage.getItem("user"));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("city", city);
    formData.append("area", area);
    formData.append("price", price);
    formData.append("airConditioner", airConditioner);
    if (image) formData.append("image", image);

    // 2. Agrega el campo user (el dueño)
    if (user?._id) formData.append("user", user._id);

    const res = await fetch("http://44.214.106.68:4000/api/flats", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      onFlatCreated && onFlatCreated(data);
      setCity(""); setArea(""); setPrice(""); setAirConditioner(false); setImage(null); setPreview(null);
    } else {
      alert("Error al crear flat: " + (data.error || "Desconocido"));
    }
  };

  return (
    <>
      <style>{`
        .home-filters-form .flatform-preview-img {
          width: 80px;
          border-radius: 10px;
          box-shadow: 0 2px 8px #38bdf833;
          margin-left: 8px;
          max-width: 100%;
          height: auto;
        }
        @media (max-width: 700px) {
          .home-filters-form .flatform-preview-img {
            margin-left: 0;
            margin-top: 8px;
            width: 100%;
            max-width: 220px;
            align-self: flex-start;
          }
        }
      `}</style>
      <form className="home-filters-form" onSubmit={handleSubmit} autoComplete="off">
        <input
          placeholder="Ciudad"
          value={city}
          onChange={e => setCity(e.target.value)}
          required
        />
        <input
          placeholder="Área (m²)"
          type="number"
          value={area}
          onChange={e => setArea(e.target.value)}
          required
        />
        <input
          placeholder="Precio"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <label>
          Aire acondicionado
          <input
            type="checkbox"
            checked={airConditioner}
            onChange={e => setAirConditioner(e.target.checked)}
          />
        </label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img src={preview} alt="preview" className="flatform-preview-img" />
        )}
        <button type="submit">Agregar departamento</button>
      </form>
    </>
  );
}
