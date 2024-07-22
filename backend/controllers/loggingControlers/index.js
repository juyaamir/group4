import UsersAccount from "../../models/UsersAccount.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/auth.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UsersAccount.findOne({ email });
    const userName = user?.firstname;
    const userId = user?._id;
    if (user && bcrypt.compareSync(password.toString(), user.password)) {
      const token = generateToken(user);
      res.json({
        userId,
        userName,
        email,
        token,
        message: "Logged in successfully",
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
};
