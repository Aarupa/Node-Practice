import jwt from 'jsonwebtoken'
let users = [
    {
        "username":"Aarti",
        "password":"aarti123"
    },
    {
         "username":"pooja",
        "password":"pooja123"
    }
];

const getuser = (req,res)=>{
    res.status(200).json(users);
}

const getregister =(req,res)=>{
    const data = req.body;

    if(!data.username || !data.password)
        return res.status(401).json({meg:"invalid user"});

    const user = users.find((u)=>u.username === data.username)
    if(user)
        return res.status(401).json({msg:"already existed"});
    else{
        users.push(data);
        res.status(200).json({msg:"register succesful"});
    }
}

const getLogin = (req,res)=>{
    const data = req.body;

    if(!data.username || !data.password)
        return res.status(401).json({meg:"invalid username and password"});

    const user = users.find((u)=>u.username === data.username && u.password===data.password)
    if(!user)
        return res.status(401).json({msg:"invalid user"});
    

    const tokenData ={username:data.username}
    const token =jwt.sign(tokenData,process.env.JWT_SECRET);
    res.status(200).json({msg:"Login successful",token});
    
}

const updateUser = (req, res) => {
    const { username, newPassword } = req.body;
    const autoHeader = req.get('Authorization');

    const token = autoHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!username || !newPassword) {
        return res.status(400).json({ msg: "Invalid data" });
    }

    const user = users.find((u) => u.username === username);
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    user.password = newPassword;
    res.status(200).json({ msg: "User updated successfully" });
}

const deleteUser = (req, res) => {
    const { username } = req.body;
    const autoHeader = req.get('Authorization');

    const token = autoHeader.replace('Bearer ', '');
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!username) {
        return res.status(400).json({ msg: "Invalid data" });
    }

    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex === -1) {
        return res.status(404).json({ msg: "User not found" });
    }

    users.splice(userIndex, 1);
    res.status(200).json({ msg: "User deleted successfully",decoded });
}



export {getuser,getregister,getLogin,updateUser,deleteUser};