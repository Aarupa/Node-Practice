import CartItem from '../schema/cartSchema.js';
import User from '../schema/userSchema.js';


const getCartItems = async (req, res) => {
  const cartItems = await CartItem.find().populate("user",{username:1});
  res.status(200).send(cartItems);
};

const addCartItem = async (req, res) => {
  const { name, quantity, price } = req.body;

  if (!req.session.user) {
      return res.status(401).send("User not authenticated");
  }

  try {
      console.log(req.session.user);
      const user = await User.findById(req.session.user._id);

      if (!user) {
          return res.status(404).send("User not found");
      }
      let cartItem ={
        name,
        quantity,
        price,
        user : user.id
      }
      cartItem = new CartItem(cartItem);
      const savedItem = await cartItem.save();
      user.cart = user.cart.concat(savedItem._id);
      await user.save();

      res.status(201).send(savedItem);
  } catch (error) {
      res.status(500).send(error.message);
  }
};

const updateCartItem = async (req, res) => {
  const { _id, quantity, price } = req.body;

  try {
    const updatedItem = await CartItem.findByIdAndUpdate(
      _id, 
      { quantity, price }, 
      { new: true } 
    );

    if (!updatedItem) {
      return res.status(404).send({ error: 'Item not found' });
    }

    res.status(200).send(updatedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
};



const deleteCartItem = async (req, res) => {
  const { _id } = req.body; 

  try {
    const deletedItem = await CartItem.findByIdAndDelete(_id);

    if (!deletedItem) {
      return res.status(404).send({ error: 'Item not found' });
    }

    res.status(200).send(deletedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export {
  addCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem,
};
