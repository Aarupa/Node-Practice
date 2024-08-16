import express from 'express';
const router = express.Router();
import { getLogin,getRegister,getUpdate,getUser,deleteUser,getUserStatus,userLogOut } from '../Controller/usersLoginController.js';


router.get('/',getUser)
router.post('/register',getRegister);
router.post('/login',getLogin);
router.put('/update',getUpdate);
router.delete('/delete',deleteUser);
router.get('/status',getUserStatus);
router.get('/logout',userLogOut);
export default  router;
