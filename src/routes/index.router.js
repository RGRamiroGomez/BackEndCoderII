import { Router } from "express";
import apiRouter from "./apis/index.api.js";

const indexRouter = Router()

indexRouter.use("/api", apiRouter)

export default indexRouter