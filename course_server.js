const express = require('express')
const students = require('./student')
const sendVerificationEmail = require("./mailer")
const { authenticate } = require('./middleware')
const { generateToken, verifyAccess } = require('./logic')

const app = express()
app.use(express.json())

app.post("/register",(req,res)=>{
    const {name,email,password,confirm_password,role} = req.body

    if(password == confirm_password){
        const token = generateToken(email,false,role)

        students.push({
            email: email,
            name: name,
            token: token,
            access: false,
            verified: false,
            role:role
        })

        sendVerificationEmail(email,token)

        res.status(200).json({message:"Sucessfull"})
    }else{
        res.status(400).json({message:"Password mismatch"})
    }
})

app.get('/verify', (request, response) => {
  try {
    const token = request.query.token

    const user = verifyAccess(token)

    if (!user) {
      return response.status(401).json({ message: "No user exist" })
    }

    const student = students.find((stu) => stu.email == user.email)

    if (!student) {
      return response.status(404).json({ message: "Student not found" })
    }

    student.access = true
    student.verified = true

    response.json({ message: "success" })

  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

app.post("/dashboard", authenticate, (request,response)=>{
    response.json({
        students: students
    })
})

app.post("/admin/dashboard", authenticate, (request,response)=>{
    response.json({
        students: students
    })
})

app.listen(3001,()=>{
    console.log("server is running at port 3001");
})