import express, {Router} from 'express';
import { getcart,createcart,updateCart,deleteCart } from '../controller/cartController.js';
const router = express.Router();

router.get('/',getcart);
router.post('/create',createcart);
router.put('/update',updateCart);
router.delete('/delete',deleteCart)

export default router
