import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
//import sessionFileStorage from "session-file-store";
import MongoStore from "connect-mongo";
import indexRouter from "./src/routes/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import mongoose from "mongoose";
console.log(process.env.DB_URI)
const server = express();
const port = process.env.PORT;
const ready = async () => {
  console.log("server ready on port " + port);
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Conectado a MongoDB");
  } catch (error) {
    throw new Error(`Error connecting to database : ${error}`);
  }
};
server.listen(port, ready);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));
server.use(cookieParser(process.env.SECRET_KEY));
//const sessionStore = new sessionFileStorage(session);
server.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: process.env.DB_URI, ttl: 60*60, retries: 2 }),
  })
);

server.use(indexRouter);
server.use(errorHandler);
