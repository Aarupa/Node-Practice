import express, { json } from 'express'
import router from './router/task1.js'

const app = express();
const PORT = process.env.PORT;



app.use(json());

app.use('/api',router);

app.listen(PORT,(req,res)=>{
    console.log(`server is running on ${PORT}`)
});