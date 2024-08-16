import jwt from 'jsonwebtoken';

let carts = [
    {
        "name": "pen",
        "quantity": 5,
        "price": 25
    },
    {
        "name": "pencil",
        "quantity": 5,
        "price": 50
    }
];

const getcart = (req, res) => {
    res.status(200).json(carts);
}

const createcart = (req, res) => {
    const { name, quantity, price } = req.body;
    const autoHeader = req.get('Authorization');

    const token = autoHeader.replace('Bearer ', '');

    if (!name || !quantity || !price) {
        return res.status(400).json({ msg: "Invalid data" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const newCart = { name, quantity, price };
    carts.push(newCart);
    console.log(carts);
    res.status(201).json(newCart);
}

const updateCart = (req, res) => {
    const {name,quantity, price } = req.body;
    const autoHeader = req.get('Authorization');


    const token = autoHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!name || quantity === undefined || price === undefined) {
        return res.status(400).json({ msg: "Invalid data" });
    }

    const index = carts.findIndex(item => item.name === name);
    if (index === -1) {
        return res.status(404).json({ msg: "Cart item not found" });
    }

    carts[index] = {...carts[index], quantity, price };
    res.status(200).json(carts[index]);
}

const deleteCart = (req, res) => {
    const { name } = req.body;
    const autoHeader = req.get('Authorization');

    const token = autoHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    if (!name) {
        return res.status(400).json({ msg: "Invalid data" });
    }

    const index = carts.findIndex(item => item.name === name);
    if (index === -1) {
        return res.status(404).json({ msg: "Cart item not found" });
    }

    const removedItem = carts.splice(index, 1);
    res.status(200).json(removedItem[0]);
}



export { getcart, createcart ,updateCart,deleteCart};
