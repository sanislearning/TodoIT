const dotenv=require('dotenv')
const jwt=require('jsonwebtoken')
dotenv.config()

async function auth(req,res,next) {
    let token=req.headers.token
    if (!token){
        return res.status(401).json({
            response:"Token missing"
        })
    }
    try{
        let value=jwt.verify(token,process.env.SECRETKEY)
        let userId=value.userId
        req.userId=userId
        next()
    }
    catch(error){
        console.log("Your token is invalid"),
        res.status(403).json({
            response:"Your token is invalid",
            error:error
        })
    }
}

module.exports=auth