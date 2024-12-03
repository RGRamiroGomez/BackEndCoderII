import { Router } from "express"
import { createProduct, deleteProduct, getProduct,getProducts, updateProduct } from "../../handlers/product.handler.js"


const router = Router()
router.get("/",getProducts)
router.get("/:pid",getProduct)
router.post("/",createProduct)
router.put("/:pid",updateProduct)
router.delete("/:pid",deleteProduct)

export default router

