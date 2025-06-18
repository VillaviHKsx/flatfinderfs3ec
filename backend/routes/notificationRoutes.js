import express from "express";
const router = express.Router();
import Notification from "../models/Notification.js";
import Comment from "../models/Comment.js";

// Notificaciones SOLO por comentarios sin respuesta
router.get("/unanswered-comments/:userId", async (req, res) => {
  try {
    // Busca notificaciones sin leer tipo "comment"
    const notis = await Notification.find({
      user: req.params.userId,
      isRead: false,
      type: "comment"  // <--- UNIFICADO
    }).populate("comment");
    // Filtra solo las que NO tienen respuesta
    const result = [];
    for (const noti of notis) {
      // Esta lógica depende de cómo manejas respuestas.
      // Si usas el campo 'response' en el comentario:
      if (noti.comment && (!noti.comment.response || !noti.comment.response.text)) {
        result.push(noti);
      }
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener comentarios sin responder" });
  }
});

export default router;