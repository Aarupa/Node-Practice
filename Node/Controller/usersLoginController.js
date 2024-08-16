import User from '../schema/userSchema.js';
import { comparePassword, hashPassword } from '../utils/passwordBcrpyt.js';

const getUser = async (req, res, next) => {
    try {
        const users = await User.find({}).populate('cart',{name:1,quantity:1});
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const getRegister = async (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body);

    if (!username || !password) {
        const error = new Error('Invalid user');
        error.status = 400;
        return next(error);
    }

    try {
        const presentUser = await User.findOne({ username });
        if (presentUser) {
            const error = new Error('User already exists');
            error.status = 400;
            return next(error);
        }

        const user = new User({ username, password: hashPassword(password) });
        await user.save();
        res.status(201).json({ message: "Registration successful" });
    } catch (err) {
        next(err);
    }
};

const getLogin = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || !comparePassword(user.password, password)) { 
            const error = new Error('Invalid user data');
            error.status = 400;
            return next(error);
        }

        req.session.user = user;
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        next(error);
    }
};

const getUpdate = async (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body);

    if (!username || !password) {
        const error = new Error('Invalid user data');
        error.status = 400;
        return next(error);
    }

    try {
        const hashedPassword = hashPassword(password);
        const user = await User.findOneAndUpdate({ username }, { password: hashedPassword }, { new: true });

        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            return next(error);
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    const { username } = req.body;

    if (!username) {
        const error = new Error('Invalid user data');
        error.status = 400;
        return next(error);
    }

    try {
        const user = await User.findOneAndDelete({ username });

        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            return next(error);
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};


const getUserStatus = async(req,res)=>{
    const user = req.session.user;
    user?res.status(200).json(user):res.status(401).json({msg:"user not logged in"});

}

const userLogOut =async(req,res)=>{
    req.session.destroy(()=>{
        console.log("user Logged out");
        res.send("User logged out successfully");
    })
}

export { getUser, getLogin, getRegister, getUpdate, deleteUser,getUserStatus,userLogOut };
