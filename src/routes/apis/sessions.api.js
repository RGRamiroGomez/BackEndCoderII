import { Router } from "express";
import { Users } from "../../data/models/user.model.js";
import { verifyUser } from "../../middlewares/verifyUser.mid.js";
import { login, online, register, signOut } from "../../handlers/sessions.handler.js";
import { createHash } from "../../middlewares/createHash.mid.js";
import { verifyHash } from "../../middlewares/verifyHash.mid.js";

const router = Router();

router.post("/register",createHash ,register);

router.post("/login", verifyUser,verifyHash,login);

router.post("/online", online)

router.post("/sign-out", signOut)
export default router;
