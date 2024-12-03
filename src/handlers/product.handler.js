import { get_products,get_product,create_product,delete_product } from "../data/services/product.services.js"

export const getProducts = async (req, res,next) => {
    try {
        const products = await get_products()
        console.log(products)
        res.status(200).json(products)
    } catch (error) {
        return next(error)
    }
}
export const getProduct = async (req, res,next) => {
    try {
        const pid = req.params.pid
        const product = await get_product(pid)
        res.status(200).json(product)
    }catch(error){
        return next(error)
    }
}

export const createProduct = async (req, res,next) => {
    try {
        const product = req.body
        const newProduct = await create_product(product)
        res.status(201).json(newProduct)
    } catch (error) {
        return next(error)
    }
}

export const updateProduct = async (req, res,next) => {
    try {
        const pid = req.params.pid
        const product = req.body
        const updatedProduct = await update_product(pid, product)
        res.status(200).json(updatedProduct)
    }catch(error){
        return next(error)
    }
}

export const deleteProduct = async (req, res,next) => {
    try {
        const pid = req.params.pid
        await delete_product(pid)
        res.status(200).json({message: "Product deleted successfully"})
    }catch(error){
        return next(error)
    }
}