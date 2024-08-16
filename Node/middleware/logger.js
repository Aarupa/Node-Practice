const logging =(req,res,next)=>{
    console.log(`${req.method} ${req.hostname} ${req.url}`);
    next();
}


export default logging;