const express=require('express');
const { todoCreate } = require('../validators/todos');
const { todoModel } = require('../schema');
const auth=require('../auth')
const router=express.Router();


router.post('/create',auth,async function(req,res){
    let todoValid=todoCreate.safeParse(req.body);
    if(todoValid.success){
        let todo=todoValid.data.todo
        let userId=req.userId
        try{
            let done=await todoModel.create({
                todo:todo,
                userId:userId
            })
            res.status(201).json({
                response:"Todo has been created",
                data:done
            })
        }
        catch(error){
            console.log(error)
            res.status(500).json({
                response:"Your todo creation has failed",
                error:error
            })
        }
    }
    else{
        res.status(400).json({
            response:"Your zod validation has failed"
        })
    }
})

router.delete('/delete',auth,async function(req,res){
    let userId=req.userId;
    let todoDelete=req.body.todoId;
    try{
        let todo=await todoModel.findOne({
            userId:userId,
            _id:todoDelete
        })
        let response=await todoModel.findByIdAndDelete(todo._id)
        res.status(200).json({
            response:"Deleted task",
            data:response
        })
    }
    catch(error){
        console.log("Failed to delete")
        res.status(500).json({
            response:"Failed to delete",
            error:error
        })
    }
})

router.put('/update',auth,async function(req,res){
    let userId=req.userId
    let todoId=req.body.todoId
    let newTodo=req.body.newTodo
    try{
        let response=await todoModel.findOneAndUpdate(
            {userId:userId,_id:todoId},
            {todo:newTodo},
            {new:true}
        )
        res.status(200).json({
            response:"Todo updated successfully",
            data:response
        })
    }
    catch(err){
        console.log("The update failed")
        res.status(400).json({
            error:err,
            response:"Todo update failed"
        })
    }
})

module.exports=router;