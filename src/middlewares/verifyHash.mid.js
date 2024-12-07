import { readByEmail } from "../data/managers/user.manager.js"
import { verifyHashUtil } from "../utils/hash.util.js"

export const verifyHash = async (req,res,next)=>{
    try {
        const {email,password} = req.body
        const user = await readByEmail(email)
        const verify = verifyHashUtil(password,user.password)
        if(verify){
            return next()
        }else{
            return res.status(401).json({message:"Invalid password"})
        }
    } catch (error) {
        return next(error)
    }
}