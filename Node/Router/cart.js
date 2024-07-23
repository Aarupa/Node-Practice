import express from 'express';
const router = express.Router();
import {getAllCart,getCart,updateCart,deleteCart,creatCart} from '../Controller/cartController.js'
import { validateCreateCart,validateCartId,validateUpdateCart } from '../validation/cartValidation.js';

router.get('/', getAllCart);
router.get('/:id',validateCartId,getCart)
router.post('/create', validateCreateCart,creatCart);
router.put('/update', validateUpdateCart,updateCart);
router.delete('/delete/:id',validateCartId,deleteCart );

export default router;
