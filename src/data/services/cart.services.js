import Carts from "../models/cart.model.js"

export const get_Carts = async () => {
    try {
        const result = await Carts.find()
        return result
    }
    catch (error) {
        throw error
    }
}

export const get_Cart = async (cid) => {
    try {
        const result = await Carts.findById(cid)
        return result
    }catch(error){
        throw error
    }
}

export const update_Cart = async (cid,data) => {
    try{
        const result = Carts.findByIdAndUpdate(cid, data, {new: true})
        return result
    }catch(error){
        throw error
    }
}

export const update_Prod_Quantity = async (cid,pid,quantity) =>{
    try{
        const cart = await get_Cart(cid)
        if (!cart) throw new Error('Carrito no encontrado')
        const product = cart.products.find(p => p._id == pid)
        product.quantity = quantity
        const result = await update_Cart(cid, cart)
        return result
    }catch(error){
        throw error
    }
}

export const remove_Prod_FromCart = async (cid,pid) =>{
    try{
        const cart = await get_Cart(cid)
        if (!cart) throw new Error('Carrito no encontrado')
        cart.products = cart.products.filter(p => p.product.toString() !== pid)
        return await cart.save()
    }catch(error){
        throw error
    }
}

export const clear_Cart = async (cid)=> {
    const cart = await Carts.findById(cid)
    if (!cart) throw new Error('Carrito no encontrado')
    cart.products = []
    return await cart.save()
}