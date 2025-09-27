import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: String,
  birthDate: Date,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
  isActive: { type: Boolean, default: true }
});

export default mongoose.model("User", UserSchema);
