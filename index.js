import "dotenv/config.js"
import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import session from "express-session"
import indexRouter from "./src/routes/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import mongoose from "mongoose"

const server = express()
const port = process.env.PORT
const ready = async ()=> {
    console.log("server ready on port "+port)
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Conectado a MongoDB")
    } catch (error) {
        throw new Error("Error connecting to database : " , error)
    }
}
server.listen(port, ready)

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static("public"))
server.use(morgan("dev"))
server.use(cookieParser())


server.use(indexRouter)
server.use(errorHandler)

