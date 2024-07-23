import express, { response } from 'express';

const router = express.Router();

// router.post('/sum',function(req,res){
//     console.log(req.body);
//     let num1 = Number(req.body.num1);
//     let num2 = Number(req.body.num2);
//     let sum = num1+num2;
//     res.send(`sum is ${sum}`);
// })


router.post('/BMI',function(req,res){
    let wtg = Number(req.body.wtg);
    let htg = Number(req.body.htg);
    let Meter = htg / 100;
    let BMI = wtg / (Meter*Meter);
    res.send(`Your BMI is ${BMI}`);
});

export default router;