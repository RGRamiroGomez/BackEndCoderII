import { Router } from "express";
import cartRouter from "./cart.api.js";
import productRouter from "./product.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionRouter from "./sessions.api.js";
//import userRouter from "./user.api.js"

const apiRouter = Router();

//apiRouter.use("/users", userRouter)
//apiRouter.use("/products", productRouter)
apiRouter.use("/carts", cartRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionRouter);

export default apiRouter;
