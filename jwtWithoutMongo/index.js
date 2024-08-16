import express  from 'express';
import userRouter from './Route/user.js'
import cartRouter from './Route/cart.js'
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/user',userRouter);
app.use('/cart',cartRouter);
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})