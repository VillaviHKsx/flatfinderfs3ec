import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

// Registro
router.post("/register", async (req, res) => {
  const { name, lastName, email, password, birthdate } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, lastName, email, password: hashed, birthdate });
    res.status(201).json({ message: "Usuario registrado", user: { name, lastName, email } });
  } catch (err) {
    res.status(400).json({ error: "El email ya está registrado" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Usuario no encontrado" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret");
  res.json({ token, user: { name: user.name, lastName: user.lastName, email: user.email, _id: user._id } });
});

export default router;