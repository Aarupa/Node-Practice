const allErrorHandler =(req,res,next)=>{
    res.status(404).json({message:"route not found"});
    next();
}

export default allErrorHandler;