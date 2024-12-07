import {
  create,
  read,
  readByEmail,
  readById,
  update,
  destroy,
} from "../data/managers/user.manager.js";
import { verifyTokenUtil } from "../utils/token.util.js";

export const login = async (req, res, next) => {
  try {
    const token= req.token
    req.cookie(token,{maxAge:60*60*1000*24,signed:true,httpOnly:true})
    res.status(200).json({message:"Usuario logeado correctamente"});
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
    const token = req.cookies.token
    if(!token){
      return res.status(400).json({message:"Usuario no conectado",online:false})
    }
    const {user} = verifyTokenUtil(token)
    const userOnline = await readById(user)
    if (userOnline) {
      return res.status(200).json({ message: "Usuario conectado",online : true });
    }
    return res.status(401).json({ message: "Bad Credentials" , online : false});
  } catch (error) {
    return next(error);
  }
};

export const signOut = async (req, res, next) => {
    try {
        req.clearCookie("token")
        return res.status(200).json({message:"Usuario desconectado con exito"})
    } catch (error) {
        return next(error);
    }
}