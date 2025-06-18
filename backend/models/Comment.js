import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  flat: { type: Schema.Types.ObjectId, ref: "Flat", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  response: {
    text: String,
    responder: { type: Schema.Types.ObjectId, ref: "User" },
    date: Date
  },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Comment", commentSchema);

