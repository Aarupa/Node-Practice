import { validationResult } from "express-validator";

let cart = [
    { id: 1, name: 'Apple', quantity: 12, price: '$30' },
    { id: 2, name: 'Banana', quantity: 12, price: '$10' },
    { id: 3, name: 'Orange', quantity: 10, price: '$20' }
  ];


  const getAllCart = (req, res) => {
    res.json(cart);
  }

  const getCart = (req,res,next)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

    const id = req.params.id;
    const carts = cart.find(cart=> cart.id == id)
    if (!carts) {
        // return res.status(404).json({ error: ' Item not found' });
        const error = new Error(`Item with ${id} not found`);
        error.status = 404;
        return next(error);
    }
     res.json(carts)
}

const updateCart = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

    const id = Number(req.body.id);
    const quantity = req.body.quantity;
    const price = req.body.price;
  
    const cartIndex = cart.findIndex(item => item.id === id);
  
    if (cartIndex === -1) {
        // return res.status(404).json({ message: 'Item not found' });
        const error = new Error(`Item not Found`);
        error.status = 404;
        return next(error);
    }
  
    if (quantity !== undefined) {
        cart[cartIndex].quantity = quantity;
    }
    if (price !== undefined) {
      cart[cartIndex].price = price;
  }
  
    res.json(cart[cartIndex]);
  }

  const creatCart = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newItem = req.body;
    cart.push(newItem);
    res.status(201).json(newItem);
  }

  const deleteCart = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = Number(req.params.id);
    cart = cart.filter(item => item.id != id);
    res.json({message:"Item deleted successfully"});
  }

  export {getAllCart,getCart,updateCart,deleteCart,creatCart};