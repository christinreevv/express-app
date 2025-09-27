import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Нет токена" });

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    res.status(401).json({ message: "Неверный токен" });
  }
};

export default auth;
