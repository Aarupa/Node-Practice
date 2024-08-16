import express ,{json} from 'express';
import session from 'express-session';
import userRouter from './Route/login.js'
const app = express();
const port = 3000;


app.use(json())

app.use(session({
    secret:'zuvy@123',
    resave:false,
    saveUninitialized:true
}));

app.use('/user',userRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))