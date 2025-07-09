const mongoose=require('mongoose')
const {Schema}=mongoose;
const dotenv=require('dotenv')
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB connection established"))
.catch((err)=>console.log("MongoDB connection failed: ",err))

const userSchema=new Schema({
    email:String,
    password:String,
    name:String
},{timestamps:true});

const todoSchema=new Schema({
    todo:String,
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{timestamps:true})

const userModel=mongoose.model('User',userSchema)
const todoModel=mongoose.model('Todo',todoSchema)

module.exports={
    userModel:userModel,
    todoModel:todoModel
}