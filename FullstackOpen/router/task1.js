import  { Router } from 'express'
const router = Router();

let person=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//task 3.1
router.get('/person',(req,res)=>{
        res.json(person);
})


//task 3.2
router.get('/info',(req,res)=>{
    const datetime = new Date();
    const persons = person.length;
    res.send(`<p>phonebook has info for ${persons} people </br> ${datetime}</p>`);
})


//task 3.3
router.get('/person/:id', (req,res)=>{
  const id = req.params.id;
  const filterpersons =person.filter(persons=>persons.id==id);
  res.json(filterpersons);
})

//task 3.4
router.delete('/person/:id',(req,res)=>{
  const id = Number(req.params.id);
  person = person.filter(person =>person.id != id);
  res.json({message:"person deleted..!!"});
})

//task 3.5

const generateId = () => {
  return Math.floor(Math.random() * 10000).toString(); 
};

router.post('/person/create',(req,res)=>{
const {name,number}= req.body;

if(!name || !number){
  return res.status(404).json({massage:"name and number is required"});
}

const exitname = person.some(p=>p.name === name);
if(exitname){
  return res.status(400).json({massage:"name must be unique"});
}

  const newperson ={ id: generateId(),name,number};
  person.push(newperson);
  res.json(newperson);
});

export default router;