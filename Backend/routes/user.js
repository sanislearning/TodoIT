const express=require('express')
const { userModel, todoModel } = require('../schema')
const { signupSchema, signinSchema } = require('../validators/user')
const bcrypt=require('bcrypt')
const router=express.Router()
const dotenv=require('dotenv')
dotenv.config();
const jwt=require('jsonwebtoken')
const auth=require('../auth')

router.post('/signup',async function(req,res){
    let ValidEntry=signupSchema.safeParse(req.body)
    if (ValidEntry.success){
        let {email,password,name}=req.body
        let userExists=await userModel.findOne({
            email:email
        })
        if (userExists){
            console.log('User exists')
            return res.json({
                response:"User already exists with that username"
            })
        }
        else{
            let hashedPass=await bcrypt.hash(password,5)
            let newUser=await userModel.create({
                email:email,
                password:hashedPass,
                name:name
            })
            console.log("User successfully added")
            res.status(200).json({
                response:"New user has been created",
                data:newUser
            })
        }
    }
    else{
        console.log("Creation failed")
    }
})

router.post('/signin',async function(req,res){
    let ValidEntry=signinSchema.safeParse(req.body)
    if (ValidEntry.success){
        let {email,password}=req.body
        let userExists=await userModel.findOne({
            email:email
        })
        if(!userExists){
            return res.status(404).json({
                response:"User not found"
            })
        }
        let Passkey=await bcrypt.compare(password,userExists.password)
        if (Passkey){
            console.log("Successful signin")
            res.status(200).json({
                response:"You have successfully logged in",
                token:jwt.sign({userId:userExists._id},process.env.SECRET_KEY)
            })
        }
        else{
            console.log("The passwords don't match")
            return res.status(400).json({
                response:"Incorrect credentials"
            })
        }
    }
    else{
        return res.status(400).json({
            response:"Such a user does not exist",
            errors:ValidEntry.error.errors
        })
    }
})

router.get('/dashboard',auth, async function(req,res){
    try{
        let userId=req.userId;
        let tasks=await todoModel.find({
            userId:userId
        })
        res.status(200).json({tasks})
    }
    catch(error){
        res.status(500).json({
            response:"Failed to fetch dashboard data",
            error:error
        })
    }
})

module.exports=router;