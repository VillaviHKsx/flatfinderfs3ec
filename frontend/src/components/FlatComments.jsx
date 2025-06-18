import React, { useEffect, useState } from "react";

export default function FlatComments({ flat, currentUser }) {
  const [comments, setComments] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [responding, setResponding] = useState({});

  // Si flat.createdBy es objeto o id
  const ownerId = flat.createdBy?._id || flat.createdBy;
  const isOwner = String(ownerId) === String(currentUser._id);

  useEffect(() => {
    fetch(`http://44.214.106.68:4000/api/comments/flat/${flat._id}`)
      .then(res => res.json())
      .then(setComments);
  }, [flat._id]);

  const handleAsk = e => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    fetch("http://44.214.106.68:4000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ flat: flat._id, user: currentUser._id, text: question })
    })
      .then(res => res.json())
      .then(newComment => {
        setComments([...comments, newComment]);
        setQuestion("");
        setLoading(false);
      });
  };

  const handleResponse = (commentId, responseText) => {
    if (!responseText.trim()) return;
    fetch(`http://44.214.106.68:4000/api/comments/${commentId}/response`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: responseText, user: currentUser._id })
    })
      .then(res => res.json())
      .then(updated => {
        setComments(comments.map(c => c._id === updated._id ? updated : c));
        setResponding({ ...responding, [commentId]: "" });
      });
  };

  // Estilo para los botones (igual que "Volver")
  const buttonStyle = {
    marginBottom: 0,
    background: "#fff",
    color: "#0ea5e9",
    border: "1px solid #b6e0fe",
    borderRadius: 6,
    padding: "6px 14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.15s"
  };

  return (
    <div style={{
      border: "1px solid #e0e7ef",
      borderRadius: 10,
      padding: 18,
      marginTop: 24,
      background: "#fff"
    }}>
      <h4 style={{color: "#0ea5e9"}}>Comentarios y Preguntas</h4>
      <form
        onSubmit={handleAsk}
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 16 // Espaciado entre input y botón
        }}
      >
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Haz una pregunta sobre este departamento..."
          style={{
            padding: 8,
            width: "70%",
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
        />
        <button type="submit" disabled={loading} style={buttonStyle}>
          Comentar
        </button>
      </form>
      <ul style={{listStyle: "none", padding: 0}}>
        {comments.length === 0 &&
          <li style={{color:"#64748b"}}>Aún no hay comentarios.</li>
        }
        {comments.map(c => (
          <li key={c._id} style={{marginBottom: 18, paddingBottom:8, borderBottom:"1px solid #f1f5f9"}}>
            <b>{c.user?.name || "Usuario"}:</b> {c.text}
            <br />
            {c.response && c.response.text ? (
              <div style={{marginLeft:16, marginTop:4, color:"#0ea5e9"}}>
                <span style={{fontWeight:600}}>Respuesta:</span> {c.response.text}
              </div>
            ) : (
              isOwner ? (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleResponse(c._id, responding[c._id] || "");
                  }}
                  style={{
                    marginLeft:16, marginTop:4,
                    display:"flex", gap: 12, alignItems: "center"
                  }}
                >
                  <input
                    type="text"
                    placeholder="Responder..."
                    value={responding[c._id] || ""}
                    onChange={e => setResponding({...responding, [c._id]: e.target.value})}
                    style={{padding: 5, borderRadius: 5, border: "1px solid #ccc"}}
                  />
                  <button type="submit" style={buttonStyle}>Responder</button>
                </form>
              ) : (
                <span style={{marginLeft:16, color:"#64748b"}}>Sin respuesta aún.</span>
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
