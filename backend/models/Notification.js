// backend/models/Notification.js
import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  flat: { type: mongoose.Schema.Types.ObjectId, ref: "Flat", required: true },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  type: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("Notification", notificationSchema);