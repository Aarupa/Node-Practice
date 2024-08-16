import express from "express";
import { createCart, getCart,updateCart,deleteCart } from "../Controller/cartController.js";


const router = express.Router();

router.get('/', getCart);
router.post('/create', createCart); 
router.put('/update',updateCart) ;
router.delete('/delete',deleteCart);

export default router;
