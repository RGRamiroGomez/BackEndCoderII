import { create,read,readByEmail,readById,update,destroy } from "../data/managers/user.manager.js";
export const verifyUser = async (req, res, next) => {
  try {
    const { email} = req.body;
    const user = await readByEmail(email)
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.session.userId = user.id;
    return next();
  } catch (error) {
    return next(error);s
  }
};
