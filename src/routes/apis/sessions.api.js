import { Router } from "express";
import { Users } from "../../data/models/user.model.js";
import { verifyUser } from "../../middlewares/verifyUser.mis.js";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    const user = await Users.create(data);
    res
      .status(201)
      .json({ message: "Usuario creado con exito" + JSON.stringify(user) });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  verifyUser;
  try {
    req.session.online = true;
    req.session.email = req.body.email;
    return res.status(200).json({ message: "Usuario conectado con exito" });
  } catch (error) {
    return next(error);
  }
});

router.post("/online", async (req,res,next)=>{
    verifyUser
    try {
        const session = req.session
        if(session.online){
            return res.status(200).json({message:"Usuario ya esta conectado"})
        }
        return res.status(400).json({message:"Usuario no esta conectado"})
    } catch (error) {
        return next(error)
    }
})

router.post("/sign-out", async (req, res, next) => {
    verifyUser
    try {
        const session = req.session
        session.destroy()
        return res.status(200).json({message:"Usuario desconectado con exito" + JSON.stringify(session)})
    } catch (error) {
        return next(error);
    }
})
export default router;
