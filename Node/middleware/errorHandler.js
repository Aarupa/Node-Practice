// const errorHandler = (error,req,res,next)=>{
//     res.status(error.status).json({message:error.message});
//     next();

// }
// export default errorHandler;


const errorHandler=(error,req,res,next)=>{
    res.status(error.status).json({message:error.message});
    next();
}

export default errorHandler;