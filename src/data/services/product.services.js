import Products from './../models/product.model.js'


export const get_products = async () => {
    try { 
        return await Products.find()
    } catch (error) {
        throw error
    }
}

export const get_product = async (pid) => {
    try {
        const product = await Products.findById(pid)
        return product
    } catch (error) {
        throw error
    }
}

export const create_product = async (product) => {
    try {
        const new_product = await Products.create(product)
        return new_product
    }catch (error) {
        throw error
    }
}

export const update_product = async (pid, product) => {
    try {
        const update_product= await Products.findByIdAndUpdate(pid, product, {new: true})
        return update_product
    } catch (error) {
        throw error
    }
}

export const delete_product = async (pid) => {
    try {
        await Products.findByIdAndDelete(pid)
        return {message: 'Product deleted successfully'}
    }catch(error){
        throw error
    }
}