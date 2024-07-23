import express, { response } from 'express';
import usersRouter from './Router/users.js'
import BmiRouter from './Router/BMI.js'

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users',usersRouter);
app.use('/',BmiRouter);


app.listen(PORT,function(){
    console.log(`server is running ${PORT}`);
})
