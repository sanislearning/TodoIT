const {z}=require('zod')

const todoCreateSchema=z.object({
    todo:z.string().min(1),
    userId:z.string().length(24) //MongoDB ObjectId length
})

module.exports={
    todoCreate:todoCreateSchema
}
