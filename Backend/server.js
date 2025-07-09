const express=require('express')
const app=express()
const cors=require('cors')
const port=3000

//Middleware
app.use(cors())
app.use(express.json())

//Route Imports
const userRouter=require('./routes/user')
const todoRouter=require('./routes/todo')

//Mount Routes
app.use('/user',userRouter)
app.use('/todos',todoRouter)

app.listen(port,function(){
    console.log("The server is up and running")
})