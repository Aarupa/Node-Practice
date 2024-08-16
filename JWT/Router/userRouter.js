import express,{ Router } from "express";
const router =express.Router();
import { getUser,getRegister,getLogin,updateUser,deleteUser } from "../Controller/userController.js";



router.get('/',getUser);
router.post('/register',getRegister);
router.post('/login',getLogin);
router.put('/update',updateUser);
router.delete('/delete',deleteUser)


export default router;