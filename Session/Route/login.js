import Router, { json } from "express";
const router = Router();

let users =[
    {
        "id":1,
        "username":"aarti",
        "password":"aarti@123",
        "wishlist":[],
        "like":[]
    },
    {
        "id":2,
        "username":"pooja",
        "password":"pooja@123",
        "wishlist":[],
        "like":[]
    }
]

router.get('/',(req,res)=>{
    res.status(200).json(users);
});


router.post('/login',(req,res)=>{
    const {id,username,password} = req.body;

    const user = users.find(u=>u.id==id || u.username === username)
    if(!user || user.password !== password){
        return res.status(401).json({Message:"invalid user"});
    }
    req.session.user =user;

    res.status(200).json({message:"Login successfully",user});
});

router.get('/wishlist',(req,res)=>{
    if(!req.session.user){
        return res.status(401).json({message:"Unauthorized"});
    }
    const user = req.session.user;
    res.status(200).json({message:user.wishlist});
});

router.post('/wishlist',(req,res)=>{
    if(!req.session.user){
        return res.status(401).json({message:"Unauthorized"});
    }

    const {item,category}=req.body;
    const user = req.session.user;
    user.wishlist.push({item,category});
    res.status(201).json({message:user.wishlist})
});

router.get('/cart',(req,res)=>{
    if(!req.session.user){
        return res.status(401).json({message:"Unauthorized"});
    }
    const cart = req.session.cart;
    res.status(200).json(cart);
});

router.post('/cart',(req,res)=>{
    const item = req.body;

    if(!req.session.user){
        return req.status(401).json({message:"Unauthorized"});
    }

    if(!req.session.cart){
        req.session.cart=[item];
    }
    req.session.cart.push(item);
    res.status(201).json({message:item});
});

router.get('/likePosts',(req,res)=>{
    if(!req.session.user){
        return res.status(401).json({message:"Unauthorized"});
    }
    const user = req.session.user;
    res.status(200).json({message:user.like});
});

router.post('/likedPosts', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { postTitle, author } = req.body;
    const user = req.session.user;

    user.like.push({ postTitle, author });
    res.status(201).json({ message: user.like});
});

export default router;