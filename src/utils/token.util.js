import jwt from "jsonwebtoken";

const {SECRET_KEY}=process.env

export const createTokenUtil = (data)=>{
    const token = jwt.sign(data, SECRET_KEY, {expiresIn: 60*60*24});
    return token
}

export const verifyTokenUtil = (token)=>{
    const verify = jwt.verify(token, SECRET_KEY);
    return verify
}