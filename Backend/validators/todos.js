const {z}=require('zod')

const todoCreateSchema=z.object({
    todo:z.string().min(1)
})

module.exports={
    todoCreate:todoCreateSchema
}
