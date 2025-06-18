import express from "express";
import multer from "multer";
import Flat from "../models/Flat.js";
import User from "../models/User.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Ruta para obtener TODOS los flats
router.get("/", async (req, res) => {
  try {
    const flats = await Flat.find().populate("createdBy", "name avatar");
    res.json(flats);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo flats" });
  }
});

// Ruta para obtener un flat por ID
router.get("/:id", async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id).populate("createdBy", "name avatar");
    if (!flat) {
      return res.status(404).json({ error: "Flat no encontrado" });
    }
    res.json(flat);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo flat" });
  }
});

// Middleware para obtener el usuario autenticado DESPUÉS de multer
async function getUser(req, res, next) {
  try {
    if (!req.body.user) {
      return res.status(401).json({ error: "No user provided" });
    }
    req.user = await User.findById(req.body.user);
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: "User lookup error" });
  }
}

// Crear un flat
router.post("/", upload.single("image"), getUser, async (req, res) => {
  try {
    const { city, area, price, airConditioner } = req.body;
    let imageUrl = "";
    if (req.file) {
      imageUrl = "/uploads/" + req.file.filename;
    }
    const flat = await Flat.create({
      city,
      area,
      price,
      airConditioner: airConditioner === "true" || airConditioner === true,
      imageUrl,
      createdBy: req.user._id,
    });
    res.json(flat);
  } catch (err) {
    res.status(500).json({ error: "Error creando flat" });
  }
});

export default router;