import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
  price: {
    type: Number,
    required: true,
  },
  user:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  }]
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;
