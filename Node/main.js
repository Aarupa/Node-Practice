import express, { json } from 'express';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = process.env.PORT;

import cartRoutes from './Router/cart.js';
// import usersRouter from './Router/users.js';
import LoginRouter from './Router/LoginRegister.js';
import logging from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import allErrorHandler from './middleware/allErrorHandler.js';
import cookieRouter from './Router/cookiesTutorial.js';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/cart')
.then(()=>console.log('connected'))
.catch(()=>console.log('connection failed'))

const secretKey = 'Aarti@123';
app.use(cookieParser(secretKey));

app.use(json());

app.use(logging)//app level middleware
app.use('/cart', cartRoutes);
// app.use('/users',usersRouter);
app.use('/users',LoginRouter);
app.use('/cookie',cookieRouter);

app.use(allErrorHandler);
app.use(errorHandler);
//app.use('/user,logging,userRouter) its just for users all router

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

