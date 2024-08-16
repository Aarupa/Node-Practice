import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cartRoutes from './Router/cart.js';
import userRouter from './Router/userLogin.js';
import allErrorHandler from './middleware/allErrorHandler.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cart')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

    app.use(session({
        secret: 'Zuvy@123',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000+5 },
        store: MongoStore.create({
            client: mongoose.connection.getClient()
        })
    }));
    

app.use('/cart', cartRoutes);
app.use('/user', userRouter);

app.use(allErrorHandler); 
app.use(errorHandler); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
