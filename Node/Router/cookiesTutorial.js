import {Router} from 'express'
const router = Router();


//setting sign cookie
router.get('/set-cookie',(req,res)=>{
    res.cookie('user','Aarti',{signed:true});
    res.send("signed cookie set");
});

//reading signed cookie
// router.get('/get-cookies',(req,res)=>{
//     res.cookie('test','hello world!');
//     res.status(200).json({message:'cookie sent ..!'})
// })

router.get('/get-cookies',(req,res)=>{
    const user = req.signedCookies.user;
    res.status(200).send(`user from signed cookie : ${user}`);
});

//handling cookie

router.get('/verify-cookie',(req,res)=>{
    const user = req.signedCookies.user;

    if(user === undefined){
        res.send('cookie was tempered with or doesn\'t exist');
    }
    else{
        res.send(`valid signed cookie : ${user}`);
    };
})

export default router;