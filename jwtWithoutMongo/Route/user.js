import { Router } from "express";
import { getuser,getLogin,getregister,updateUser,deleteUser} from "../controller/userController.js";

const router = Router();

router.get('/',getuser);
router.post('/register',getregister);
router.post('/login',getLogin);
router.put('/update',updateUser)
router.delete('/delete',deleteUser)
export default router;

