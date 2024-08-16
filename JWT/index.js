import express, { json } from 'express';
import mongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import userRouter from './Router/userRouter.js';
import cartRouter from './Router/cartRouter.js';

const app = express();
const PORT = process.env.PORT;
app.use(json());

mongoose.connect('mongodb://localhost:27017/users')
.then(()=>{console.log('Connect to MongoDB')})
.catch((err)=>{console.err('Failed To connect',err)});

app.use('/user',userRouter);
app.use('/cart',cartRouter);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})