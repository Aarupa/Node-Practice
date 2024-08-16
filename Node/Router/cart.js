import express from 'express';
import { addCartItem, getCartItems, updateCartItem, deleteCartItem } from '../Controller/cartsController.js';

const router = express.Router();

router.post('/', addCartItem);
router.get('/', getCartItems);
router.put('/update', updateCartItem);
router.delete('/delete', deleteCartItem);

export default router;
