import express from 'express';
const router = express.Router();
import { getLogin,getRegister,getUpdate,getUser } from '../Controller/LoginregisterController';


router.get('/',getUser)
router.post('/register',getRegister);
router.post('/login',getLogin);
router.post('/update',getUpdate);

export default  router;
