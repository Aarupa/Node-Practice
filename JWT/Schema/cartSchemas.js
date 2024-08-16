import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required: true
    }
});

const Carts = mongoose.model('Carts',cartSchema);
export default Carts;