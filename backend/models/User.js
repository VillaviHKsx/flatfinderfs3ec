import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  birthdate: { type: Date, required: true },
  notifications: [{
    message: String,
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
  }]
});

const User = mongoose.model('User', userSchema);
export default User;