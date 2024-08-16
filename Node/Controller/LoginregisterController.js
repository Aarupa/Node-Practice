let users = [
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
    res.json(users);
}


const getRegister = (req,res,next)=>{
    const Newuser=req.body;
    console.log(req.body);

    if(!Newuser.id || !Newuser.username){
        // return res.status(400).json({message:"invalid user"});
        const error = new Error('Invalid user');
        error.status = 400;
        return next(error);

    }

    const presentUser = users.find(u => u.id === Newuser.id);
    if (presentUser) {
        // return res.status(400).json({ message: "User already exists" });
        const error = new Error('User already exists');
        error.status = 400;
        return next(error);
    }

    users.push(Newuser);
    res.status(201).json({message:"registration successfully"});
}

const getLogin = (req,res,next)=>{
    console.log(req.body);
    const id = Number(req.body.id);
    const username = req.body.username;
    const userIndex = users.findIndex(u=>u.id == id);
    if (!id || !username) {
        // return res.status(400).json({ message: "Invalid user data" });
        const error = new Error('Invalid user data');
        error.status = 400;
        return next(error);
    }
    else if(users[userIndex].username !== username){
         // res.status(404).json({message:"Login Failed!"});
        const error = new Error('Login failed');
        error.status = 401;
        return next(error);
    }
    // return res.status(200).json({ message: "Login successful" });
    res.status(200).json({ message: 'Login successful' });

}

const getUpdate = (req,res)=>{
    console.log(req.body);
    const id = Number(req.body.id);
    const username = req.body.username;
    const userIndex = users.findIndex(u=>u.id == id);

    if (!id || !username ) {
        // return res.status(400).json({ message: "Invalid user data" });
        const error = new Error('Invalid User Data');
        error.status = 404;
        return next(error);
    }

    if(userIndex === -1 ){
    //    return res.status(400).json({message:"user not found"});
        const error = new Error('User Not Found');
        error.status = 400;
        return next(error);
    }

    users[userIndex].username = username;

    res.json(users);

}

const deleteUser = (req, res, next) => {
    const id = Number(req.params.id);

    // Remove the user from the array
    users = users.filter(user => user.id !== id);

    res.json({ message: "User deleted successfully" });
};


export {getUser,getLogin,getRegister,getUpdate,deleteUser};