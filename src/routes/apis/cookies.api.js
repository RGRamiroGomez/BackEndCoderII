import { Router } from "express"

const router = Router()

router.get("/set",async (req,res,next)=>{
    try {
        const message= "COOKIE SETEADA"
        res.status(200).cookie("entre","true").json(message)
    } catch (error) {
        return next(error)
    }
})

router.get("/get",async (req,res,next)=>{
    try {
        const cookie = req.cookies.entre
        if(cookie){
            res.status(200).json(cookie)
        }else
        {
            res.status(200).json("COOKIE NO ENCONTRADA")
        }
    }catch(error) {
        return next(error)
    }
})

export default router