import { Router } from "express"
import { GetCart,GetCarts,UpdateCart,UpdateProdQuantity,RemoveProdFromCart,ClearCart } from "../../handlers/cart.handler.js"

const router = Router()
router.get('/', GetCarts)
router.get('/:cid', GetCart)
router.put('/:cid', UpdateCart)
router.put('/:cid/products/:pid', UpdateProdQuantity)
router.delete('/:cid/products/:pid', RemoveProdFromCart)
router.delete('/:cid', ClearCart)

export default router