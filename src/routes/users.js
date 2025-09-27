import { Router } from "express";
import User from "../models/User.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
    return res.status(403).json({ message: "Нет доступа" });
  }
  const user = await User.findById(req.params.id).select("-password");
  res.json(user);
});

router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Нет доступа" });
  const users = await User.find().select("-password");
  res.json(users);
});

router.patch("/:id/block", auth, async (req, res) => {
  if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
    return res.status(403).json({ message: "Нет доступа" });
  }
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  res.json({ message: "Пользователь заблокирован", user });
});

export default router;
