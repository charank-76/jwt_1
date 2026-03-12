const express = require('express');
const app=express();
const { generateToken, verifyToken } = require('./logic');
app.use(express.json());
const users=[
    {
        'email':'charan@gmail.com',
        'password':'charan123',
    },
    {
        'email':'akhil@gmail.com',
        'password':'akhil123'
    }
]
const loginUsers=[]
app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    const user = users.filter((user)=>user.email===email && user.password===password);
    if(user.length == 1){
        loginUsers.push(email);
        const token = generateToken({email:email,password:password,access:true});
        res.json({message:'Login successful', token: token});
    }else{
        res.status(401).json({message:'Invalid credentials'});
    }
});
function authorize(req,res,next){
    const token = request.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'No token provided'});
    }
    try{
        data
    }

app.get('/music',authorize,(req,res)=>{
    const {token} = req.query;
    if(verifyToken(token) != undefined){
        res.json({message:'Access granted to music'});
    }else{
        res.status(403).json({message:'Access denied to music'});
    }
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})
