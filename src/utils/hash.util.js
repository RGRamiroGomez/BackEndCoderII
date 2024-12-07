import { genSaltSync,hashSync,compareSync } from "bcrypt";

export const createHashUtil = (password) => {
    const salt = genSaltSync(10)
    const hashedPassword = hashSync(password, salt)
    return hashedPassword
}

export const verifyHashUtil = (password, hashedPassword) => {
    const isValid = compareSync(password, hashedPassword)
    return isValid
}