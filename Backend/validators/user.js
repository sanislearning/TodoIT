const {z}=require('zod');

const signupSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6).max(100),
    name:z.string().min(1).max(100)
})

const signinSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

module.exports={
    signupSchema,
    signinSchema
}