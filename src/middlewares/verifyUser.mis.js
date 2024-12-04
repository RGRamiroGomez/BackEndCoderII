import { Users } from "../data/models/user.model.js";
export const verifyUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const pwd = password === user.password;
    if (!pwd) {
      return res.status(401).json({ message: "Invalid password" });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
