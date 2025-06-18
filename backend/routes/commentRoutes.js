import express from "express";
import Comment from "../models/Comment.js";
import Flat from "../models/Flat.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

const router = express.Router();

// Obtener comentarios de un flat
router.get("/flat/:flatId", async (req, res) => {
  try {
    const comments = await Comment.find({ flat: req.params.flatId })
      .populate("user", "name avatar")
      .populate("response.responder", "name avatar")
      .sort({ date: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo comentarios" });
  }
});

// Crear comentario en un flat
router.post("/", async (req, res) => {
  try {
    const { flat, user, text } = req.body;
    if (!flat || !user || !text) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    const newComment = await Comment.create({
      flat,
      user,
      text,
    });

    // Buscar flat para saber a quién notificar
    const flatDoc = await Flat.findById(flat);
    if (flatDoc && String(flatDoc.createdBy) !== String(user)) {
      await Notification.create({
        user: flatDoc.createdBy, // dueño del flat
        flat: flatDoc._id,
        comment: newComment._id,
        type: "comment", // <--- UNIFICADO
        isRead: false,
      });
    }

    // Enviar el comentario con el usuario populado
    const populated = await Comment.findById(newComment._id).populate("user", "name avatar");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: "Error creando comentario" });
  }
});

// Responder a un comentario y marcar la notificación como leída
router.put("/:commentId/response", async (req, res) => {
  try {
    const { text, user } = req.body;
    if (!text || !user) {
      return res.status(400).json({ error: "Faltan datos de respuesta" });
    }
    const updated = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { response: { text, responder: user, date: new Date() } },
      { new: true }
    )
      .populate("user", "name avatar")
      .populate("response.responder", "name avatar");

    // Marcar la notificación asociada como leída
    await Notification.updateOne(
      { comment: req.params.commentId, isRead: false },
      { $set: { isRead: true } }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error al responder el comentario" });
  }
});

export default router;