import express, { response } from 'express';
import { getUsers,getUserSort } from '../Controller/userController.js';
import { query, param } from 'express-validator';
const router= express.Router();
const PORT = process.env.PORT

// app.get('/users',(req,res)=>{
//     res.json(users)
// })

router.get('/:id', query ('limit').isInt({min:1}),getUsers);
router.get('/', query('sort').isIn(['asc','desc']).optional(),getUserSort);

export default router;