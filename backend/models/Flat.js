import mongoose from "mongoose";

const flatSchema = new mongoose.Schema({
  city: String,
  area: Number,
  price: Number,
  airConditioner: Boolean,
  imageUrl: String, // aquí se guardará la ruta de la imagen
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // opcional
});

const Flat = mongoose.model("Flat", flatSchema);
export default Flat;