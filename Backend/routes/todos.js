const express=require('express');
const { model } = require('mongoose');
const { todoCreate } = require('../validators/todos');
const { todoModel } = require('../schema');
const auth=require('../auth')
const router=express.Router();


router.post('/create',auth,async function(req,res){
    let todoValid=todoCreate.safeParse(req.body);
    if(todoValid.success){
        let todo=todoValid.data.todo
        let userId=todoValid.data.userId
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

router.delete('/delete',function(req,res){

})

router.put('/update',function(req,res){

})

module.exports=router;