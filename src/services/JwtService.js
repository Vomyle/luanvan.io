const jwt = require("jsonwebtoken");
const dotenv=require('dotenv')
const genneralAccessToken = async (payload) => {

  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "1h" }
  );
  return access_token;
};
const genneralRefreshAccessToken = async (payload) => {

    const refresh_token = jwt.sign(
      {
        payload,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "365d" }
    );
    return refresh_token;
  };
  const refreshTokenJwtService = (token) => {
   
   return new Promise((resolve, reject)=>{
    try {
      jwt.verify(token,process.env.REFRESH_TOKEN,async(err,user)=>{
        if(err){
          resolve({
            status:'OK',
            message:'sjsjs'
          })
  
        }

        const {payload}=user
        const access_token= await genneralAccessToken({
          id:payload?.id,
          IsAdmin:payload?.IsAdmin
        })
        resolve({
          status:'OK',
          message:'Success',
          access_token
        })
      })
     
      
    } catch (e) {
      reject(e)
    }
   })
  };



module.exports = {
  genneralAccessToken,
  genneralRefreshAccessToken,
  refreshTokenJwtService,
  
};
