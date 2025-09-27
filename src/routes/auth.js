import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

router.post("/register", async (req, res) => {
    
  const { fullName, birthDate, email, password, role } = req.body;
  const candidate = await User.findOne({ email });
  if (candidate) return res.status(400).json({ message: "Email уже занят" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ fullName, birthDate, email, password: hashedPassword, role });

  res.status(201).json({ message: "Регистрация прошла успешно", user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Неверный email или пароль" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Неверный email или пароль" });

  const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
  res.json({ token });
});

export default router;
