import {
  create,
  read,
  readByEmail,
  readById,
  update,
  destroy,
} from "../data/managers/user.manager.js";
import { verifyUser } from "../middlewares/verifyUser.mid.js";

export const login = async (req, res, next) => {
  try {
    const user = await readByEmail(req.body.email);
    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const one = await readByEmail(req.body.email);
    if (one) return res.status(400).json({ message: "Email already exists" });
    const user = await create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
};

export const online = async (req, res, next) => {
  try {
    const session = req.session;
    if (session.online) {
      return res.status(200).json({ message: "Usuario ya esta conectado" });
    }
    return res.status(400).json({ message: "Usuario no esta conectado" });
  } catch (error) {
    return next(error);
  }
};

export const signOut = async (req, res, next) => {
    try {
        const session = req.session
        session.destroy()
        return res.status(200).json({message:"Usuario desconectado con exito" + JSON.stringify(session)})
    } catch (error) {
        return next(error);
    }
}