import { get_Cart,get_Carts,update_Cart,update_Prod_Quantity,remove_Prod_FromCart,clear_Cart } from "../data/services/cart.services.js"

export const GetCarts = async (req, res , next) => {
    try {
        const carts = await get_Carts()
        res.status(200).json({status : "success", data :carts})
    } catch (error) {
        return next(error)
    }
}

export const GetCart = async (req, res , next) => {
    try {
        const cart = await get_Cart(req.params.cid)
        res.status(200).json({status : "success", data :cart})
    }catch(error){
        return next(error)
    }
}

export const UpdateCart = async (req, res , next) => {
    try {
        const cart = await update_Cart(req.params.cid, req.body)
        res.status(200).json({status : "success", data :cart})
    } catch (error) {
        return next(error)
    }
}

export const UpdateProdQuantity = async (req, res , next) => {
    try {
        const cart = await update_Prod_Quantity(req.params.cid,req.params.pid ,req.body)
        res.status(200).json({status : "success", data :cart})
    } catch (error) {
        return next(error)
    }
}

export const RemoveProdFromCart = async (req, res , next) => {
    try {
        const cart = await remove_Prod_FromCart(req.params.cid, req.params.pid)
        res.status(200).json({status : "success", data :cart})
    } catch (error) {
        return next(error)
    }
}

export const ClearCart = async (req, res , next) => {
    try {
        const cart = await clear_Cart(req.params.cid)
        res.status(200).json({status : "success", data : cart})
    } catch (error) {
        return next(error)
    }
}