const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()
const authMiddleware=(req,res,next)=>{
    console.log("checkToken",req.headers.token)
   
    const token= req.headers.token.split(' ')[1]
     jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
      if(err){
        return res.status(404).json({
            message:"the authentication",
            status:"ERROR"
        })
      }
      const {payload}=user
      if(payload.IsAdmin){
        next()
    
      }else{
        return res.status(404).json({
            message:"the authentication",
            status:"ERROR",
           
        })
      
      }
      
     });
}
const authUserMiddleware=(req,res,next)=>{
  const token= req.headers.token.split(' ')[1]
  const userId=req.params._id
   jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
    if(err){
      return res.status(404).json({
          message:"the authentication",
          status:"ERROR"
      })
    }
    const {payload}=user
    if(payload?.IsAdmin || payload?._id===userId){
      next()
  
    }else{
      return res.status(404).json({
          message:"the authentication",
          status:"ERROR",
         
      })
    
    }
    
   });
}


module.exports={
    authMiddleware,
    authUserMiddleware,

}
