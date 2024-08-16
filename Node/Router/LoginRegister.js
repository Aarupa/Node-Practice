import express from 'express';
const router = express.Router();
import { getLogin,getRegister,getUpdate,getUser,deleteUser } from '../Controller/LoginregisterController.js';


router.get('/',getUser)
router.post('/register',getRegister);
router.post('/login',getLogin);
router.post('/update',getUpdate);
router.delete('/delete/:id',deleteUser);
export default  router;
