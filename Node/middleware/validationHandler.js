import { validationResult } from "express-validator";

const validationHandler = (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.msg})
    }
    next();
};

export default validationHandler;