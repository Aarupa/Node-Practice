const user = [
    {
        id:1,
        username:"Aarti",
        email:"aarti@gmail.com"
    },
    {
        id:2,
        username:"kirti",
        email:"kirti@gmail.com"
    }

]

const getUser = (req,res)=>{
    res.json(user);
}


const getRegister = (req,res,next)=>{
    const Newuser=req.body;
    console.log(req.body);

    if(!Newuser.id || !Newuser.username){
        // return res.status(400).json({message:"invalide user"});
        const error = new Error('Invalid user');
        error.status = 400;
        return next(error);

    }

    const presentUser = user.find(u => u.id === Newuser.id);
    if (presentUser) {
        // return res.status(400).json({ message: "User already exists" });
        const error = new Error('User already exists');
        error.status = 400;
        return next(error);
    }

    user.push(Newuser);
    res.status(201).json({message:"registraction successfully"});
}

const getLogin = (req,res,next)=>{
    console.log(req.body);
    const id = Number(req.body.id);
    const username = req.body.username;
    const userindex = user.findIndex(u=>u.id == id);
    if (!id || !username) {
        // return res.status(400).json({ message: "Invalid user data" });
        const error = new Error('Invalid user data');
        error.status = 400;
        return next(error);
    }
    else if(user[userindex].username !== username){
         // res.status(404).json({message:"Login Failed!"});
        const error = new Error('Login failed');
        error.status = 401;
        return next(error);
    }
    // return res.status(200).json({ message: "Login successfull" });
    res.status(200).json({ message: 'Login successful' });

}

const getUpdate = (req,res)=>{
    console.log(req.body);
    const id = Number(req.body.id);
    const username = req.body.username;
    const userindex = user.findIndex(u=>u.id == id);

    if (!id || !username ) {
        // return res.status(400).json({ message: "Invalid user data" });
        const error = new Error('Invalid User Data');
        error.status = 404;
        return next(error);
    }

    if(userindex === -1 ){
    //    return res.status(400).json({message:"user not found"});
        const error = new Error('User Not Found');
        error.status = 400;
        return next(error);
    }

    user[userindex].username = username;

    res.json(user);

}

export {getUser,getLogin,getRegister,getUpdate}