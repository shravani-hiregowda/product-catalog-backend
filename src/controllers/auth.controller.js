import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Owner from "../models/Owner.js";

/**
 * POST /api/auth/login
 */
export const loginOwner = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const owner = await Owner.findOne({ username });
  if (!owner) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, owner.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: owner._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};
