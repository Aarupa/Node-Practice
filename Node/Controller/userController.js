import {validationResult} from 'express-validator'
const users=[
    {id:1, name: 'Aarti', age: 21, city: 'pune'},
    {id:2, name: 'kirti', age: 18, city: 'pune'},
    {id:3, name: 'pooja', age: 24, city: 'SambhajiNagar'},
    {id:4, name: 'mayuri', age:21, city: 'vaijapur'},
    {id:5, name: 'nikita', age:20, city: 'MP'}
];

const getUsers= (req,res,next)=>{
    const id = req.params.id
    const user = users.find(user=> user.id == id)
    if (!user) {
        // return res.status(404).json({ error: 'User not found' });
        const error = new Error(`user with ${id} not found`);
         error.status = 404
        return next(error);
    }
     res.send(user)
}

const getUserSort = (req, res) => {
   const  error = validationResult(req)

    const {limit, sort} = req.query;
    let sortUsers = [...users];

    if(sort === 'asc'){
        sortUsers.sort((a,b)=> a.name.localeCompare(b.name));
    }
    else if(sort === 'desc'){
        sortUsers.sort((a,b) => b.name.localeCompare(a.name));
    }

    if (limit !== undefined && parseInt(limit) > 0) {
        return res.json(users.slice(0, parseInt(limit)));
    }

    res.json(sortUsers);
}

export {getUsers,getUserSort};