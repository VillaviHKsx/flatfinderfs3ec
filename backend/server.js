import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import flatRoutes from "./routes/flatRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();

// Configuración de CORS para permitir solo tu frontend
app.use(cors({
  origin: [
    "http://44.214.106.68"           // Cambia por la IP pública de tu EC2
  ],
  credentials: true
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sirve la carpeta ./uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/users", userRoutes);
app.use("/api/flats", flatRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}).catch((err) => {
  console.error("No se pudo conectar a la base de datos:", err);
});
