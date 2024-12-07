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
    res.status(200).json(req.session.userId);
  } catch (error) {
    return next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    res.status(201).json(req.user);
  } catch (error) {
    return next(error);
  }
};

export const online = async (req, res, next) => {
  try {
    const session = req.session;
    if (session.userId) {
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