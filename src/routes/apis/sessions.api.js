import { Router } from "express";
import { Users } from "../../data/models/user.model.js";
import { verifyUser } from "../../middlewares/verifyUser.mid.js";
import { login, online, register, signOut } from "../../handlers/sessions.handler.js";
import passport from "../../middlewares/passport.mid.js"
import passportCallBack from "./../../middlewares/passportCallBack.mid.js"
import { createHash } from "../../middlewares/createHash.mid.js";
import { verifyHash } from "../../middlewares/verifyHash.mid.js";

const router = Router();

router.post("/register",passportCallBack("register") ,register);

router.post("/login", passportCallBack("login"),login);

router.post("/online", passportCallBack("online"),online)

router.post("/sign-out", passportCallBack("sign-out"),signOut)
export default router;
